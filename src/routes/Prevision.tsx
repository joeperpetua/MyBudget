import { BudgetItem, useSettings } from "@/components/settings-provider";
import { H1, H2, H3, P } from "@/components/ui/typography";
import { currencySymbolMap } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router";

const calcTotalIncome = (people: BudgetItem[]) => people.reduce((sum, person) => sum + person.value, 0);
/** 
 * Calculates the contribution of each person based on the percentage passed and their income.
*/
const calcPercentage = (people: BudgetItem[], percentage: number) => {
  return people.map(person => person.value * percentage / 100);
};

const calcContribution = (totalIncome: number, income: number, expense: number) => {
  return expense / (totalIncome / income);
}

const calcBudget = (people: BudgetItem[], sharedExpenses: BudgetItem[], savings: BudgetItem[]) => {
  const totalIncome = calcTotalIncome(people);

  const calculatedSavings = savings.map(saving => {
    return { ...saving, value: calcPercentage(people, saving.value) }
  });

  const calculatedExpenses = people.map(person => {
    return {
      name: person.name, expensesContribution: sharedExpenses.map(expense => {
        return { ...expense, value: calcContribution(person.value, totalIncome, expense.value) };
      })
    };
  });

  const totalExpenses = sharedExpenses.reduce((sum, expense) => sum + expense.value, 0);
  const totalSavings = calculatedSavings.reduce((sum, saving) => {
    const currentSavingTotal = saving.value.reduce((sum, value) => sum + value, 0);
    return sum + currentSavingTotal;
  }, 0);


  console.log({
    savings: calculatedSavings,
    sharedExpenses: calculatedExpenses,
    totalExpenses,
    totalSavings,
    total: Number((totalExpenses + totalSavings).toFixed(0)),
  })

  return {
    savings: calculatedSavings,
    sharedExpenses: calculatedExpenses,
    totalExpenses,
    totalSavings,
    total: Number((totalExpenses + totalSavings).toFixed(0)),
  };
};

const Prevision = () => {
  const params = useParams();
  const { budgets, currentBudget, currency, setCurrentBudget } = useSettings();
  const budget = params.id === 'current' && currentBudget ? currentBudget : budgets.find(budget => budget.id === params.id);
  const budgetContributions = budget && calcBudget(budget.people, budget.sharedExpenses, budget.savings);

  if (!budget) {
    return (
      <div className='flex flex-col p-4 min-h-screen'>
        <H1>Something went wrong</H1>
      </div>
    )
  }

  useEffect(() => {
    if (!budget) return;
    setCurrentBudget(budget);
  }, [budget]);

  return (
    <div className='flex flex-col p-4 pb-24 min-h-screen'>
      <H1>{budget.name}</H1>
      <H2 className="mt-8 border-none">Incomes</H2>
      <div className="px-4 border rounded-md bg-secondary">
        {budget.people.map((person, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{person.name}</H3>
            <H3>{`${person.value}${currencySymbolMap[currency]}`}</H3>
          </div>
        ))}
      </div>

      <H2 className="mt-8 border-none">Contributions</H2>
      <div className="px-4 border rounded-md bg-secondary">
        {budget.people.map((person, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{person.name}</H3>
            <H3>{`${calcContribution(calcTotalIncome(budget.people), person.value, budgetContributions!.total).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
          </div>
        ))}
      </div>

      <H2 className="mt-8 border-none">Savings</H2>
      <div className="px-4 border rounded-md bg-secondary">
        {budgetContributions!.savings.map((saving, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{saving.name}</H3>
            <div className="flex flex-col w-1/2">
              <div className="flex justify-between items-end gap-2">
                <P className="text-sm text-ring leading-[1.5rem]">month</P>
                <H3>{`${saving.value.reduce((sum, value) => sum + value, 0).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
              </div>

              <div className="flex justify-between items-end gap-2">
                <P className="text-sm text-ring leading-[1.5rem]">year</P>
                <H3>{`${(saving.value.reduce((sum, value) => sum + value, 0) * 12).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
              </div>

              <div className="flex justify-between items-end gap-2">
                <P className="text-sm text-ring leading-[1.5rem]">5 year</P>
                <H3>{`${(saving.value.reduce((sum, value) => sum + value, 0) * 12 * 5).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <H2 className="mt-8 border-none">Budget Composition</H2>
      <div className="px-4 border rounded-md bg-secondary">
        <div className="flex justify-between py-4 border-b">
          <H3>Shared Expenses</H3>
          <H3>{`${budgetContributions!.totalExpenses.toFixed(0)}${currencySymbolMap[currency]}`}</H3>
        </div>
        <div className="flex justify-between py-4 border-b">
          <H3>Savings</H3>
          <H3>{`${budgetContributions!.totalSavings.toFixed(0)}${currencySymbolMap[currency]}`}</H3>
        </div>
        <div className="flex justify-between py-4 border-b">
          <H3>Total</H3>
          <H3>{`${budgetContributions!.total.toFixed(0)}${currencySymbolMap[currency]}`}</H3>
        </div>
      </div>

      <H2 className="mt-8 border-none">Reminders</H2>
      <div className="px-4 border rounded-md bg-secondary">
        {budget.people.map((person, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{person.name}</H3>
            <div className="flex flex-col w-1/2">
              <div className="flex justify-between items-end gap-2">
                <P className="text-sm text-ring leading-[1.5rem]">month</P>
                <H3>{`${(person.value - calcContribution(calcTotalIncome(budget.people), person.value, budgetContributions!.total)).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
              </div>
              
              <div className="flex justify-between items-end gap-2">
                <P className="text-sm text-ring leading-[1.5rem]">year</P>
                <H3>{`${((person.value - calcContribution(calcTotalIncome(budget.people), person.value, budgetContributions!.total)) * 12).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
              </div>

              <div className="flex justify-between items-end gap-2">
                <P className="text-sm text-ring leading-[1.5rem]">5 year</P>
                <H3>{`${((person.value - calcContribution(calcTotalIncome(budget.people), person.value, budgetContributions!.total)) * 12 * 5).toFixed(0)}${currencySymbolMap[currency]}`}</H3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prevision;