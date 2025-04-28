export type CurrencySymbol = '$' | '€' | '£' | '%';
export type Currency = 'usd' | 'euro' | 'pound';
export interface BudgetItem {
  name: string;
  value: number;
}

export interface Budget {
  id: string;
  name: string;
  people: BudgetItem[];
  sharedExpenses: BudgetItem[];
  savings: BudgetItem[];
}

export interface PeopleContributions {
  name: string;
  totalContribution: number;
  expenses: BudgetItem[];
  savings: BudgetItem[];
  remainder: number;
}

export interface BudgetContributions {
  peopleContributions: PeopleContributions[];
  savings: {
    value: number[];
    name: string;
  }[];
  sharedExpenses: BudgetItem[];
  totalExpenses: number;
  totalSavings: number;
  totalBudget: number;
}

export const currencySymbolMap = {
  usd: "$",
  euro: "€",
  pound: "£"
}

export const toCurrency = (number: number, currency: Currency) => {
  if (currency === "usd")
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency: 'USD',
    }).format(number);

  if (currency === "euro")
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency: 'EUR',
    }).format(number);

  if (currency === "pound")
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency: 'GBP',
    }).format(number);

  return number.toString();
}

