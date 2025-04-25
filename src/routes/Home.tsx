import { Currency, useSettings } from "@/components/settings-provider";
import { Theme, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H1, H3, Lead } from "@/components/ui/typography";
import { Moon, Settings, Sun } from "lucide-react";

const SettingsSheet = () => {
  const { theme,setTheme } = useTheme();
  const { currency, setCurrency } = useSettings();
  
  return (
    <div className="flex flex-col w-full">
      <Sheet>
        <SheetTrigger className="self-end">
          <Settings size={32} />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="border-none">Settings</SheetTitle>
            <SheetDescription>Set the apps preferences here</SheetDescription>
          </SheetHeader>
          <div className="px-4">

            <div className="mt-8">
              <H3>Theme</H3>
              <Tabs defaultValue={theme} className="mt-2 w-full" onValueChange={(value) => setTheme(value as Theme)}>
                <TabsList className="w-full">
                  <TabsTrigger value="light">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  </TabsTrigger>
                  <TabsTrigger value="dark">
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                  </TabsTrigger>
                  <TabsTrigger value="system">Auto</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mt-8">
              <H3>Currency</H3>
              <Tabs defaultValue={currency} className="mt-2 w-full" onValueChange={(value) => setCurrency(value as Currency)}>
                <TabsList className="w-full">
                  <TabsTrigger value="usd">$</TabsTrigger>
                  <TabsTrigger value="euro">€</TabsTrigger>
                  <TabsTrigger value="pound">£</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col p-4 h-full">
      <SettingsSheet />
      <H1>My budgets</H1>
      <Lead>Manage or create your budgets</Lead>
    </div>
  );
};

export default Home;