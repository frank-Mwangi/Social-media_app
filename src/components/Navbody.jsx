import React from "react";
import Search from "./Search";
import Navicons from "./Navicons";
import "../styles/navbody.scss";

const Navbody = () => {
  return (
    <div className="navbody">
      <Search />
      <Navicons />
    </div>
  );
};

export default Navbody;
