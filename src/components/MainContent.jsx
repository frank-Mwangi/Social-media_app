import React from "react";
import "../styles/maincontent.scss";
import Hero from "./Hero";
import Main from "./Main";

const MainContent = () => {
  return (
    <div className="maincontent">
      <Hero />
      <Main />
    </div>
  );
};

export default MainContent;
