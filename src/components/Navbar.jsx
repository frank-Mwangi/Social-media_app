import React from "react";
import Logo from "./Logo";

import "../styles/navbar.scss";
import Navbody from "./Navbody";

const Navbar = () => {
  return (
    <div className="navbar">
      <Logo />
      <Navbody />
    </div>
  );
};

export default Navbar;
