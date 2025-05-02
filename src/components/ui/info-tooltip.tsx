import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";

interface InfoTooltipProps {
  description: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ description }) => {
  return (
    <Popover>
      <PopoverTrigger><CircleHelp size={20} /></PopoverTrigger>
      <PopoverContent>{description}</PopoverContent>
    </Popover>
  );
};

export default InfoTooltip;