import React from "react";
import avi from "../assets/avatar.png";
import "../styles/avi.scss";

const Avi = () => {
  return (
    <div className="avi">
      <img src={avi} alt="no-avi" />
    </div>
  );
};

export default Avi;
