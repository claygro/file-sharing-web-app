import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <NavLink to="/layout/home">Home</NavLink>
        <NavLink to="/layout/mydrive">My drive</NavLink>
      </nav>
    </>
  );
};

export default NavBar;
