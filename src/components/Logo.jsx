import React from "react";
import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import "../styles/logo.scss";
const Logo = () => {
  return (
    <div className="logo">
      <img src={menu} alt="no menu" />
      <img src={logo} alt="no logo" />
      <h1>Hiphonic</h1>
    </div>
  );
};

export default Logo;
