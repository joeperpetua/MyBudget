import { Currency, Budget } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Settings {
  currency: Currency;
  budgets: Budget[];
  currentBudget: Budget | null;
}

interface SettingsContextType extends Settings {
  setCurrency: (currency: Currency) => void;
  setBudget: (budget: Budget) => void;
  setCurrentBudget: (budget: Budget) => void;
  removeBudget: (id: string) => void;
};

const defaultContext: SettingsContextType = {
  currency: "usd",
  budgets: [],
  currentBudget: null,
  setCurrency: () => {},
  setBudget: () => {},
  setCurrentBudget: () => {},
  removeBudget: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultContext);

type SettingsProviderProps = {
  children: ReactNode;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(readSettings());

  function readSettings(): Settings {
    const stored = JSON.parse(window.localStorage.getItem('settings') || '{}');

    return {
      currency: stored.currency === undefined ? defaultContext.currency : stored.currency,
      budgets: stored.budgets === undefined ? defaultContext.budgets : stored.budgets,
      currentBudget: stored.currentBudget === undefined ? stored.budgets[0] || null : stored.currentBudget,
    };
  }

  function setCurrency(value: Currency): void {
    const newSettings: Settings = { ...settings, currency: value };

    window.localStorage.setItem('settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  }

  function setBudget(budget: Budget): void {
    const budgetIndex = settings.budgets.findIndex(b => b.id === budget.id);
    let updatedBudgets;
    
    if (budgetIndex > -1) {
      updatedBudgets = [...settings.budgets];
      updatedBudgets[budgetIndex] = budget;
    } else {
      updatedBudgets = [...settings.budgets, budget];
    }

    const newSettings: Settings = { ...settings, budgets: updatedBudgets };

    window.localStorage.setItem('settings', JSON.stringify(newSettings));
    setSettings(newSettings);
    setCurrentBudget(budget);
  }

  function setCurrentBudget(budget: Budget): void {
    const newSettings: Settings = { ...settings, currentBudget: budget };

    window.localStorage.setItem('settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  }

  function removeBudget(id: string): void {
    const newSettings: Settings = { ...settings, budgets: settings.budgets.filter(b => b.id !== id) };
    if (newSettings.currentBudget?.id === id) {
      newSettings.currentBudget = newSettings.budgets[0] || null;
    }

    window.localStorage.setItem('settings', JSON.stringify(newSettings));
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