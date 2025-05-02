import { useSettings } from "@/components/settings-provider";
import InfoTooltip from "@/components/ui/info-tooltip";
import { H2, H3 } from "@/components/ui/typography";
import { toCurrency } from "@/types";

interface PrevisionIncomesProps {
  title: string;
  description: string;
  items: { name: string, value: number }[];
}

const PrevisionIncomes: React.FC<PrevisionIncomesProps> = ({ title, description, items }) => {
  const { currency } = useSettings();

  return (
    <>
      <div className="flex items-center gap-2 mt-8">
        <H2 className="border-none">{title}</H2>
        <InfoTooltip description={description} />
      </div>
      <div className="px-4 border rounded-md bg-secondary">
        {items.map((person, index) => (
          <div key={index} className="flex justify-between py-4 border-b">
            <H3>{person.name}</H3>
            <H3>{toCurrency(person.value, currency)}</H3>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrevisionIncomes;