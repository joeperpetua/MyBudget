import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col p-4 min-h-screen">
      <Outlet />
      <Navbar />
    </div>
  );
}

export default Layout;
