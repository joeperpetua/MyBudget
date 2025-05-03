import { Currency, Budget } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Preferences } from '@capacitor/preferences';

interface Settings {
  currency: Currency;
  budgets: Budget[];
  currentBudget: Budget | null;
}

interface SettingsContextType extends Settings {
  setCurrency: (currency: Currency) => Promise<void>;
  setBudget: (budget: Budget) => Promise<void>;
  setCurrentBudget: (budget: Budget) => Promise<void>;
  removeBudget: (id: string) => Promise<void>;
};

const defaultContext: SettingsContextType = {
  currency: "usd",
  budgets: [],
  currentBudget: null,
  setCurrency: () => Promise.resolve(),
  setBudget: () => Promise.resolve(),
  setCurrentBudget: () => Promise.resolve(),
  removeBudget: () => Promise.resolve(),
};

const SettingsContext = createContext<SettingsContextType>(defaultContext);

type SettingsProviderProps = {
  children: ReactNode;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    currency: defaultContext.currency, 
    budgets: defaultContext.budgets, 
    currentBudget: defaultContext.currentBudget
  });

  useEffect(() => {
    readSettings().then(setSettings);
  }, []);

  async function readSettings(): Promise<Settings> {
    const pref = await Preferences.get({ key: 'settings' });
    const stored = JSON.parse(pref.value || '{}');

    return {
      currency: stored.currency === undefined ? defaultContext.currency : stored.currency,
      budgets: stored.budgets === undefined ? defaultContext.budgets : stored.budgets,
      currentBudget: stored.currentBudget === undefined ? defaultContext.currentBudget : stored.currentBudget,
    };
  }

  async function setCurrency(value: Currency): Promise<void> {
    const newSettings: Settings = { ...settings, currency: value };

    await Preferences.set({ key: 'settings', value: JSON.stringify(newSettings) });
    setSettings(newSettings);
  }

  async function setBudget(budget: Budget): Promise<void> {
    const budgetIndex = settings.budgets.findIndex(b => b.id === budget.id);
    let updatedBudgets;
    
    if (budgetIndex > -1) {
      updatedBudgets = [...settings.budgets];
      updatedBudgets[budgetIndex] = budget;
    } else {
      updatedBudgets = [...settings.budgets, budget];
    }

    const newSettings: Settings = { ...settings, budgets: updatedBudgets };

    await Preferences.set({ key: 'settings', value: JSON.stringify(newSettings) });
    setSettings(newSettings);
    setCurrentBudget(budget);
  }

  async function setCurrentBudget(budget: Budget): Promise<void> {
    const newSettings: Settings = { ...settings, currentBudget: budget };

    await Preferences.set({ key: 'settings', value: JSON.stringify(newSettings) });
    setSettings(newSettings);
  }

  async function removeBudget(id: string): Promise<void> {
    const newSettings: Settings = { ...settings, budgets: settings.budgets.filter(b => b.id !== id) };
    if (newSettings.currentBudget?.id === id) {
      newSettings.currentBudget = newSettings.budgets[0] || null;
    }

    await Preferences.set({ key: 'settings', value: JSON.stringify(newSettings) });
    setSettings(newSettings);
  }

  const value = {
    currency: settings.currency,
    budgets: settings.budgets,
    currentBudget: settings.currentBudget,
    setCurrency,
    setBudget,
    setCurrentBudget,
    removeBudget,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (context === undefined) throw new Error("useSettings must be used within a SettingsProvider")

  return context;
}