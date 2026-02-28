import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBox from "./Search";
const LayOut = () => {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <SearchBox />
        <div className="flex">
          <div className="sticky top-0 h-screen">
            <NavBar />
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayOut;
