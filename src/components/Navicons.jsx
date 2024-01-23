import React from "react";
import message from "../assets/message.png";
import notification from "../assets/notification.png";
import profilePic from "../assets/nature.jpg";
import chevron from "../assets/chevron-down.png";
import "../styles/navicons.scss";

const Navicons = () => {
  return (
    <div className="navicons">
      <img src={message} alt="no-icon" />
      <img src={notification} alt="no-icon" />
      <img src={profilePic} alt="no-icon" className="profilePic" />
      <img src={chevron} alt="no-icon" />
    </div>
  );
};

export default Navicons;
