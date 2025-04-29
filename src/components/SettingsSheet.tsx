import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Github, Moon, Settings, Sun } from "lucide-react";
import { useSettings } from "./settings-provider";
import { useTheme, Theme } from "./theme-provider";
import { H3, P } from "./ui/typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Currency } from "@/types";

const SettingsSheet = () => {
  const { theme, setTheme } = useTheme();
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

            <div className="mt-2">
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
          <SheetFooter>
            <div className="pt-4">
              <H3>About</H3>
              <P>MyBudget is an app targeted to people with multiple sources of income or a group of people joining a budget together (i.e. a couple, house mates, group of friends, etc.).</P>
              {/* <P>Whether you are planning a budget for a household, a trip with friends, or a joint-project, MyBudget aims to distribute the expenses fairly between all participants.</P> */}
              <P>The app calculates the contribution in a fair way, so that everyone contributes based on their income.</P>
              <P>Use cases: household budget, trip budget, joint-project budget, co-working space budget, etc.</P>
            </div>
            <div className="flex items-center justify-center py-8">
              <a target='_blank' rel='noopener noreferrer' href="https://github.com/joeperpetua/mybudget"><Github /></a>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SettingsSheet;