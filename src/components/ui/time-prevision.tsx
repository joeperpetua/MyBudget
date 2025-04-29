import { useSettings } from "@/components/settings-provider";
import { H3, P } from "@/components/ui/typography";
import { toCurrency } from "@/types";

interface TimePrevisionProps {
  period: string;
  value: number;
}

const TimePrevision: React.FC<TimePrevisionProps> = ({ period, value }) => {
  const { currency } = useSettings();

  return (
    <div className="flex justify-end gap-2">
      <H3>{toCurrency(value, currency)}</H3>
      <P className="self-end text-sm text-ring leading-[1.5rem] min-w-10 !mt-0">{period}</P>
    </div>
  );
}

export default TimePrevision;