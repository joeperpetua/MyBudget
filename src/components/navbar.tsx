import { ChartLine, Home, ListPlus } from "lucide-react";
import { H4 } from "./ui/typography";
import { NavLink } from "react-router";

interface NavbarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ icon, label, to }) => {
  return (
    <NavLink to={to} className="flex flex-col items-center">
      {icon}
      <H4 className="!mt-0">{label}</H4>
    </NavLink>
  )
}

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 flex justify-between items-center h-[12vh] w-full px-8 bg-background text-primary">
      <NavbarItem icon={<Home size={32} />} label="Home" to="/" />
      <NavbarItem icon={<ListPlus size={32} />} label="Budget" to="/budgets/current" />
      <NavbarItem icon={<ChartLine size={32} />} label="Prevision" to="/previsions/current" />
    </div>
  );
};

export default Navbar;