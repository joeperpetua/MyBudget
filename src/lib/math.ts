import { BudgetContributions, BudgetItem } from "@/types";

export const sumList = (list: number[]) => list.reduce((sum, value) => sum + value, 0);

const calcTotalIncome = (people: BudgetItem[]) => people.reduce((sum, person) => sum + person.value, 0);

/** 
 * Returns an array with the percentage of the income of each person.
 * Example: percentage = 10, people[0].value = 1000, people[1].value = 3000 => [100, 300]
*/
const calcPercentage = (people: BudgetItem[], percentage: number): number[] => {
  return people.map(person => person.value * percentage / 100);
};

/**
 * Returns the fair contribution of a given income to a given expense based on the total income of all people.
*/
const calcContribution = (totalIncome: number, income: number, expense: number): number => {
  return expense / (totalIncome / income);
}

export const calcBudget = (people: BudgetItem[], sharedExpenses: BudgetItem[], savings: BudgetItem[]): BudgetContributions => {
  const totalIncome = calcTotalIncome(people);
  const calculatedSavings = savings.map(saving => {
    return { ...saving, value: calcPercentage(people, saving.value) }
  });

  const peopleContributions = people.map(person => {
    const expenses = sharedExpenses.map(expense => {
      return { ...expense, value: calcContribution(totalIncome, person.value, expense.value) };
    });

    const savings = calculatedSavings.map(saving => {
      const currentSavingTotal = saving.value.reduce((sum, value) => sum + value, 0);
      return { ...saving, value: calcContribution(totalIncome, person.value, currentSavingTotal) };
    });

    const totalContribution = expenses.reduce((sum, expense) => sum + expense.value, 0) + savings.reduce((sum, saving) => sum + saving.value, 0);

    const remainder = person.value - totalContribution;

    return {
      name: person.name,
      totalContribution,
      expenses,
      savings,
      remainder
    };
  });

  const totalExpenses = sharedExpenses.reduce((sum, expense) => sum + expense.value, 0);
  const totalSavings = calculatedSavings.reduce((sum, saving) => {
    const currentSavingTotal = saving.value.reduce((sum, value) => sum + value, 0);
    return sum + currentSavingTotal;
  }, 0);

  return {
    peopleContributions,
    savings: calculatedSavings,
    sharedExpenses,
    totalExpenses,
    totalSavings,
    totalBudget: totalExpenses + totalSavings,
  };
}