import SettingsSheet from "@/components/SettingsSheet";
import { Button } from "@/components/ui/button";
import { H1, H3, Lead } from "@/components/ui/typography";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Plus } from "lucide-react";
import { useSettings } from "@/components/settings-provider";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface BudgetListItemProps {
  name: string;
  id: string;
  openRename: () => void;
  openDelete: () => void;
  selectItem: () => void;
}

const BudgetListItem: React.FC<BudgetListItemProps> = ({ name, id, openDelete, openRename, selectItem }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    selectItem();
    setOpenDropdown(false);
  };

  return (
    <Link to={`/budgets/${id}`} className="flex items-center justify-between p-4 border rounded-md">
      <H3>{name}</H3>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}><EllipsisVertical /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={(e) => { handleClick(e); openRename(); }}>Rename</DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { handleClick(e); openDelete(); }}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
}

const Home = () => {
  const { budgets, setBudget, removeBudget } = useSettings();
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [renameInput, setRenameInput] = useState("");

  const addBudget = () => {
    const newBudget = { name: "Untitled budget", id: uuidv4(), people: [], sharedExpenses: [], savings: [] };
    budgets.push(newBudget);
    setBudget(newBudget);
  };

  const renameBudget = () => {
    if (renameInput === "") {
      toast.error("Name cannot be empty");
      return;
    }

    const budgetIndex = budgets.findIndex(b => b.id === selectedBudget);
    if (budgetIndex === -1) {
      toast.error("Something went wrong");
      return;
    }

    budgets[budgetIndex].name = renameInput;
    setBudget(budgets[budgetIndex]);
    setShowRenameDialog(false);
    setRenameInput("");
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <SettingsSheet />
      <H1>My budgets</H1>
      <Lead>Manage or create your budgets</Lead>
      <div className="flex flex-col gap-4 mt-8">
        {budgets.map(budget => (
          <BudgetListItem
            key={budget.id}
            id={budget.id}
            name={budget.name}
            openRename={() => setShowRenameDialog(true)}
            openDelete={() => setShowDeleteDialog(true)}
            selectItem={() => setSelectedBudget(budget.id)}
          />
        ))}
        <Button onClick={addBudget}><Plus /> New budget</Button>
      </div>

      <Drawer open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Rename budget</DrawerTitle>
            <DrawerDescription>
              Choose a new name for this budget. Click save when done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col justify-center items-center gap-2 py-8 px-4">
            <Input
              type="text"
              placeholder="New name"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
            />
          </div>
          <DrawerFooter className="pt-2">
            <Button onClick={renameBudget}>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete budget</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this budget? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant={"destructive"} onClick={() => removeBudget(selectedBudget)}>Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Home;