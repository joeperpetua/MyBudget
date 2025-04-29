import { ChartLine, Home, ListPlus } from "lucide-react";
import { H4 } from "./ui/typography";
import { NavLink, useLocation } from "react-router";

interface NavbarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ icon, label, to, isActive }) => {
  const baseClass = `flex flex-col items-center ${isActive ? "text-foreground" : "text-ring"}`;

  return (
    <NavLink to={to} className={baseClass}>
      {icon}
      <H4 className="!mt-0">{label}</H4>
    </NavLink>
  )
}

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 flex justify-between items-center h-[12vh] w-full px-8 bg-background text-primary">
      <NavbarItem 
        icon={<Home size={32} />} 
        label="Home" 
        to="/" 
        isActive={location.pathname === "/"} 
      />
      
      <NavbarItem 
        icon={<ListPlus size={32} />} 
        label="Budget" 
        to="/budgets/current" 
        isActive={location.pathname.includes("/budgets/")} 
      />

      <NavbarItem 
        icon={<ChartLine size={32} />} 
        label="Prevision" 
        to="/previsions/current" 
        isActive={location.pathname.includes("/previsions/")} 
      />
    </div>
  );
};

export default Navbar;