import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TimePrevision from "@/components/ui/time-prevision";
import { H2, H3 } from "@/components/ui/typography";
import { sumList } from "@/lib/math";
import { CircleHelp } from "lucide-react";
import React from "react";

interface PrevisionSavingsProps {
  title: string;
  description: string;
  items: { name: string, value: number[] }[];
}

const PrevisionSavings: React.FC<PrevisionSavingsProps> = ({ title, description, items }) => {
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
        {items.map((saving, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{saving.name}</H3>
            <div className="flex flex-col w-1/2">
              <TimePrevision period="month" value={sumList(saving.value)} />
              <TimePrevision period="year" value={sumList(saving.value) * 12} />
              <TimePrevision period="5 year" value={sumList(saving.value) * 12 * 5} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrevisionSavings;