import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <NavLink to="/layout/home">Home</NavLink>
        <NavLink to="/layout/mydrive">My drive</NavLink>
        <NavLink to="/layout/share">Share</NavLink>
        <NavLink to="/layout/history">History</NavLink>
        <NavLink to="/layout/recents">Recent</NavLink>
        <NavLink to="/layout/setting">Setting</NavLink>
      </nav>
    </>
  );
};

export default NavBar;
