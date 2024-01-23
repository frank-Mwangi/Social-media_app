import React from "react";
import Menu from "./Menu";
import Shortcuts from "./Shortcuts";
import "../styles/sidebar.scss";
import Avatar from "./Avatar";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Avatar />
      <Menu />
      <Shortcuts />
    </div>
  );
};

export default Sidebar;
