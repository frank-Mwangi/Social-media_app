import React from "react";

import "../styles/navbar.scss";
//import Navbody from "./Navbody";
//import Search from "./Search";
//import Navicons from "./Navicons";

import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import message from "../assets/message.png";
import notification from "../assets/notification.png";
import profilePic from "../assets/avatar.png";
import chevron from "../assets/chevron-down.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={menu} alt="no menu" />
        <img src={logo} alt="no logo" />
        <h1>Hiphonic</h1>
      </div>
      <div className="navbody">
        <div>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navicons">
          <img src={message} alt="no-icon" />
          <img src={notification} alt="no-icon" />
          <img src={profilePic} alt="no-icon" className="profilePic" />
          <img src={chevron} alt="no-icon" />
        </div>
      </div>
      {/* <Navbody /> */}
    </div>
  );
};

export default Navbar;
