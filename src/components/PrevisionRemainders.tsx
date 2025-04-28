import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TimePrevision from "@/components/ui/time-prevision";
import { H2, H3 } from "@/components/ui/typography";
import { PeopleContributions } from "@/types";
import { CircleHelp } from "lucide-react";

interface PrevisionRemaindersProps {
  title: string;
  description: string;
  items: PeopleContributions[];
}

const PrevisionRemainders: React.FC<PrevisionRemaindersProps> = ({ title, description, items }) => {
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
            <div className="flex flex-col w-2/3">
              <TimePrevision period="month" value={person.remainder} />
              <TimePrevision period="year" value={person.remainder * 12} />
              <TimePrevision period="5 year" value={person.remainder * 12 * 5} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrevisionRemainders;