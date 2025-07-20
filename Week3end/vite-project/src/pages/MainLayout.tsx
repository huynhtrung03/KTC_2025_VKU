import { Outlet } from "react-router";
import { NavBar } from "../components/Navbar";

export const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-white min-h-screen flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};