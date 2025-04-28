import { H1, H3, Lead } from '@/components/ui/typography'
import { useSettings } from '@/components/settings-provider';
import { useParams } from 'react-router';
import { Budget as IBudget, BudgetItem } from '@/types';
import BudgetSection from '@/components/BudgetSection';
import { useEffect } from 'react';

export const getBudget = (budgets: IBudget[], currentBudget: IBudget | null, id: string | undefined) => {
  if (id === 'current' && currentBudget) return currentBudget;
  return budgets.find(budget => budget.id === id) || budgets[0];
};

const Budget = () => {
  const params = useParams();
  const { budgets, currentBudget, setBudget, setCurrentBudget } = useSettings();
  const budget = getBudget(budgets, currentBudget, params.id);

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

  useEffect(() => {
    if (!budget) return;
    setCurrentBudget(budget);
  }, [budget]);

  const addSectionItem = (name: string, value: string, section: string) => {
    const sectionKey = section as keyof IBudget;
    const sectionArray = budget[sectionKey] as BudgetItem[];
    sectionArray.push({ name, value: Number(value) });
    
    setBudget({ ...budget, [sectionKey]: sectionArray });
  }

  const updateSectionItem = (index: number, name: string, value: string, section: string) => {
    const sectionKey = section as keyof IBudget;
    const sectionArray = budget[sectionKey] as BudgetItem[];
    sectionArray[index] = { name, value: Number(value) };
    
    setBudget({ ...budget, [sectionKey]: sectionArray });
  }

  const removeSectionItem = (index: number, section: string) => {
    const sectionKey = section as keyof IBudget;
    const sectionArray = budget[sectionKey] as BudgetItem[];
    sectionArray.splice(index, 1);
    
    setBudget({ ...budget, [sectionKey]: sectionArray });
  }

  return (
    <div className='flex flex-col p-4 pb-20 min-h-screen'>
      <H1>{budget.name}</H1>
      <Lead>Tweak your budget values</Lead>

      <BudgetSection 
        title='Incomes' 
        section='people' 
        description='Add a new person to the budget. Specify the name and the net income.'
        items={budget.people}
        valueLabel='Net Income' 
        addItem={addSectionItem} 
        updateItem={updateSectionItem}
        removeItem={removeSectionItem}
      />
      <BudgetSection 
        title='Shared Expenses' 
        section='sharedExpenses' 
        description='Add a new expense to the budget. Specify the name and the total amount for the expense.'
        items={budget.sharedExpenses}
        valueLabel='Amount' 
        addItem={addSectionItem} 
        updateItem={updateSectionItem}
        removeItem={removeSectionItem}
      />
      <BudgetSection 
        title='Savings' 
        section='savings' 
        description='Add a new saving to the budget. Specify the name and the income percentage to be saved.'
        items={budget.savings}
        percentual={true}
        valueLabel='Income Percentage' 
        addItem={addSectionItem} 
        updateItem={updateSectionItem}
        removeItem={removeSectionItem}
      />
    </div>
  )
}

export default Budget;
