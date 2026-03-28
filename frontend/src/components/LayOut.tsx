import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import TopNavBar from "./TopNavBar";

const LayOut = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopNavBar />

      <div className="flex flex-1 min-h-0">
        <div className="flex-none">
          <NavBar />
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayOut;
