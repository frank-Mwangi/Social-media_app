import React from "react";
import "../styles/main.scss";
import CompleteProfile from "./CompleteProfile";

const Main = () => {
  return (
    <div className="main">
      <div className="profile-info">
        <CompleteProfile />
      </div>
      <div className="timeline"></div>
    </div>
  );
};

export default Main;
