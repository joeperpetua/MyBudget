import { useSettings } from "@/components/settings-provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { H2, H3 } from "@/components/ui/typography";
import { BudgetContributions, toCurrency } from "@/types";
import { CircleHelp } from "lucide-react";

interface PrevisionBudgetCompositionProps {
  title: string;
  description: string;
  data: BudgetContributions;
}

const PrevisionBudgetComposition: React.FC<PrevisionBudgetCompositionProps> = ({ title, description, data }) => {
  const { currency } = useSettings();

  return (
    <>
      <div className="flex items-center gap-2 mt-8">
        <H2 className="border-none">{title}</H2>
        <Popover>
          <PopoverTrigger><CircleHelp size={20} /></PopoverTrigger>
          <PopoverContent>{description}</PopoverContent>
        </Popover>
      </div>
      <div className="px-4 border rounded-md bg-secondary">
        <div className="flex justify-between py-4 border-b">
          <H3>Shared Expenses</H3>
          <H3>{toCurrency(data.totalExpenses, currency)}</H3>
        </div>
        <div className="flex justify-between py-4 border-b">
          <H3>Savings</H3>
          <H3>{toCurrency(data.totalSavings, currency)}</H3>
        </div>
        <div className="flex justify-between py-4 border-b">
          <H3>Total</H3>
          <H3>{toCurrency(data.totalBudget, currency)}</H3>
        </div>
      </div>
    </>
  );
}

export default PrevisionBudgetComposition;