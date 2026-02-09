import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
const LayOut = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <Outlet />
    </>
  );
};

export default LayOut;
