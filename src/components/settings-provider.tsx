import React, { createContext, useContext, useState, ReactNode } from "react";

export type CurrencySymbol = '$' | '€' | '£' | '%';
export type Currency = 'usd' | 'euro' | 'pound';

interface Settings {
  currency: Currency;
}

interface SettingsContextType extends Settings {
  setCurrency: (currency: Currency) => void;
};

const defaultContext: SettingsContextType = {
  currency: "usd",
  setCurrency: () => { },
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
      currency: stored.currency === undefined ? defaultContext.currency : stored.currency
    };
  }

  function setCurrency(value: Currency): void {
    const newSettings: Settings = { ...settings, currency: value };

    window.localStorage.setItem('settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  }

  const value = {
    currency: settings.currency,
    setCurrency,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (context === undefined)
    throw new Error("useSettings must be used within a SettingsProvider")

  return context;
}