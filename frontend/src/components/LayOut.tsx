import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const LayOut = () => {
  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <NavBar />
        </div>
        <div className="flex-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayOut;
