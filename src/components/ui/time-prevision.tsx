import { useSettings } from "@/components/settings-provider";
import { H3, P } from "@/components/ui/typography";
import { toCurrency } from "@/types";

interface TimePrevision {
  period: string;
  value: number;
}

const TimePrevision: React.FC<TimePrevision> = ({ period, value }) => {
  const { currency } = useSettings();

  return (
    <div className="flex justify-end items-end gap-2">
      <H3>{toCurrency(value, currency)}</H3>
      <P className="text-sm text-ring leading-[1.5rem] min-w-10">{period}</P>
    </div>
  );
}

export default TimePrevision;