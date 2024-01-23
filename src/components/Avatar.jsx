import React from "react";
import avi from "../assets/nature.jpg";
import "../styles/avatar.scss";

const Avatar = () => {
  return (
    <div className="avatar">
      <img src={avi} alt="no=avi" />
      <div className="details">
        <h4>Kaizer Soze</h4>
        <p>@K.soze</p>
      </div>
    </div>
  );
};

export default Avatar;
