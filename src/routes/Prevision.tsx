import { useSettings } from "@/components/settings-provider";
import { H1, H3, Lead } from "@/components/ui/typography";
import { useEffect } from "react";
import { useParams } from "react-router";
import PrevisionIncomes from "@/components/PrevisionIncomes";
import PrevisionContributions from "@/components/PrevisionContributions";
import PrevisionSavings from "@/components/PrevisionSavings";
import PrevisionBudgetComposition from "@/components/PrevisionBudgetComposition";
import PrevisionRemainders from "@/components/PrevisionRemainders";
import { calcBudget } from "@/lib/math";
import { getBudget } from "@/routes/Budget";
import SettingsSheet from "@/components/SettingsSheet";

const Prevision = () => {
  const params = useParams();
  const { budgets, currentBudget, setCurrentBudget } = useSettings();
  const budget = getBudget(budgets, currentBudget, params.id);
  const budgetContributions = budget && calcBudget(budget.people, budget.sharedExpenses, budget.savings);

  useEffect(() => {
    if (!budget) return;
    setCurrentBudget(budget);
  }, [budget]);

  if (budgets.length === 0) return (
    <div className='flex flex-col justify-center h-[88vh]'>
      <H3 className='text-center'>You have no budgets yet, create one in the home page!</H3>
    </div>
  )

  if (!budget) {
    return (
      <div className='flex flex-col justify-center h-[88vh]'>
        <H3 className='text-center'>Something went wrong while loading the budget o.o</H3>
      </div>
    )
  }

  return (
    <div className='flex flex-col p-4 pb-24 min-h-screen'>
      <SettingsSheet />
      <H1>{budget.name}</H1>
      <Lead>See how your budget will look like</Lead>

      <PrevisionIncomes
        title='Incomes'
        description='The incomes of each person to be used in the budget.'
        items={budget.people}
      />

      <PrevisionBudgetComposition
        title="Budget Composition"
        description="How much each part of the budget takes up."
        data={budgetContributions}
      />

      <PrevisionContributions
        title='Contributions'
        description='How much each person contributes to the budget. This will vary on the person income in relation to the sum of all incomes.'
        items={budgetContributions.peopleContributions}
      />

      <PrevisionSavings
        title='Savings'
        description='Prevision of the money to be saved for each saving category.'
        items={budgetContributions.savings}
      />

      <PrevisionRemainders
        title="Remainders"
        description="The money of each participant that was not needed to cover the budget."
        items={budgetContributions.peopleContributions}
      />
    </div>
  );
};

export default Prevision;