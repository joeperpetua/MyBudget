import BudgetSectionItem from "@/components/BudgetSectionItem";
import { useSettings } from "@/components/settings-provider";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import InfoTooltip from "@/components/ui/info-tooltip";
import { Input } from "@/components/ui/input";
import { H2, H4, P } from "@/components/ui/typography";
import { BudgetItem, currencySymbolMap } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BudgetSectionProps {
  title: string;
  section: string;
  description: string;
  drawerHelp: string;
  items: BudgetItem[];
  percentual?: boolean;
  valueLabel: string;
  addItem: (name: string, value: string, section: string) => void;
  updateItem: (index: number, name: string, value: string, section: string) => void;
  removeItem: (index: number, section: string) => void;
}

const BudgetSection: React.FC<BudgetSectionProps> = ({
  title,
  items,
  percentual = false,
  section,
  description,
  drawerHelp,
  valueLabel,
  addItem,
  updateItem,
  removeItem
}) => {
  const { currency } = useSettings();
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const handleAdd = () => {
    if (nameInput === '') {
      toast.error('Name cannot be empty');
      return;
    }
    if (valueInput === '' || Number(valueInput) < 0 || Number.isNaN(valueInput)) {
      toast.error('Invalid value');
      return;
    }

    addItem(nameInput, valueInput, section);
    setOpenAddItemDialog(false);
    setNameInput('');
    setValueInput('');
  }

  return (
    <>
      <div className="flex items-center gap-2 mt-8 border-b-3">
        <H2 className="border-none">{title}</H2>
        <InfoTooltip description={description} />
      </div>
      <div className='flex flex-col gap-2 p-4'>
        {items.map((item, index) => (
          <BudgetSectionItem
            key={index}
            index={index}
            name={item.name}
            value={item.value}
            valueLabel={valueLabel}
            percentual={percentual}
            section={section}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        ))}
        <Button onClick={() => setOpenAddItemDialog(true)}><Plus /> Add new</Button>
      </div>

      <Drawer open={openAddItemDialog} onOpenChange={setOpenAddItemDialog}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add entry</DrawerTitle>
            <DrawerDescription>{drawerHelp}</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col  gap-2 p-4">
            <H4>Name</H4>
            <Input
              type="text"
              className="w-4/5"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <H4>{valueLabel}</H4>
            <div className='flex items-center gap-2 mb-4'>
              <Input
                type="number"
                className="w-1/5 text-center"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
              />
              <P className='!m-0 font-bold'>{percentual ? '%' : currencySymbolMap[currency]}</P>
            </div>
          </div>

          <DrawerFooter className="pt-2">
            <Button onClick={handleAdd}>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default BudgetSection;