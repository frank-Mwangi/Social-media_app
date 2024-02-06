import React from "react";
import "../styles/maincontent.scss";
import Hero from "./Hero";
import Profile from "./Profile";

const MainContent = () => {
  return (
    <div className="maincontent">
      <Hero />
      <Profile />
    </div>
  );
};

export default MainContent;
