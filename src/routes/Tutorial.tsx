import { H1, Lead } from "@/components/ui/typography";

const Tutorial = () => {
  return(
    <div className="flex flex-col p-4 h-screen bg-background z-10">
      <H1>Make the most out of MyBudget!</H1>
      <Lead>Create a new budget by clicking </Lead>
    </div>
  );
};

export default Tutorial;