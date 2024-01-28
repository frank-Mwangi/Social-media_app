import React from "react";
import Header from "./Header";
import "../styles/hero.scss";
import Avi from "./Avi";
import Bio from "./Bio";

const Hero = () => {
  return (
    <div className="hero">
      <Header />
      <Avi />
      <Bio />
    </div>
  );
};

export default Hero;
