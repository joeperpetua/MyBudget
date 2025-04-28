import { useSettings } from "@/components/settings-provider";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { H3, H4, P } from "@/components/ui/typography";
import { BudgetItem, currencySymbolMap } from "@/types";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BudgetSectionItemProps extends BudgetItem {
  index: number;
  valueLabel: string;
  percentual: boolean;
  section: string;
  removeItem: (index: number, section: string) => void;
  updateItem: (index: number, name: string, value: string, section: string) => void;
}

const BudgetSectionItem: React.FC<BudgetSectionItemProps> = ({ index, name, value, valueLabel, percentual, section, removeItem, updateItem }) => {
  const { currency } = useSettings();
  const [openEditItemDialog, setOpenEditItemDialog] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [valueInput, setValueInput] = useState(value.toString());

  const handleUpdate = () => {
    if (nameInput === '') {
      toast.error('Name cannot be empty');
      return;
    }
    if (valueInput === '' || Number(valueInput) < 0 || Number.isNaN(valueInput)) {
      toast.error('Invalid value');
      return;
    }

    updateItem(index, nameInput, valueInput, section);
    setOpenEditItemDialog(false);
  }

  return (
    <div className='flex items-center justify-between p-4'>
      <H3>{name}</H3>
      <div className='flex items-center gap-2'>
        <H4 className='mr-2'>{`${value}${percentual ? '%' : currencySymbolMap[currency]}`}</H4>
        <Button onClick={() => setOpenEditItemDialog(true)}><Pencil /></Button>
        <Button variant={'destructive'} onClick={() => removeItem(index, section)}><X /></Button>
      </div>

      <Drawer open={openEditItemDialog} onOpenChange={setOpenEditItemDialog}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Modify entry</DrawerTitle>
            <DrawerDescription>Change the entry name and values here. Click save when you are done.</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-2 p-4">
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
            <Button onClick={handleUpdate}>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
};

export default BudgetSectionItem;