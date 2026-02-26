import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBox from "./Search";
const LayOut = () => {
  return (
    <>
      <SearchBox />
      <div className="flex">
        <div className="">
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
