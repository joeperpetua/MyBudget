import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Settings, Sun } from "lucide-react";
import { useSettings, Currency } from "./settings-provider";
import { useTheme, Theme } from "./theme-provider";
import { H3 } from "./ui/typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default SettingsSheet;