import { useSettings } from "@/components/settings-provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { H2, H3 } from "@/components/ui/typography";
import { PeopleContributions, toCurrency } from "@/types";
import { CircleHelp } from "lucide-react";

interface PrevisionContributionsProps {
  title: string;
  description: string;
  items: PeopleContributions[];
}

const PrevisionContributions: React.FC<PrevisionContributionsProps> = ({ title, description, items }) => {
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
        {items.map((person, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{person.name}</H3>
            <H3>{toCurrency(person.totalContribution, currency)}</H3>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrevisionContributions;