import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const LayOut = () => {
  return (
    <>
      <div className="flex gap-x-2">
        <div>
          <NavBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayOut;
