import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../styles/container.scss";

const Container = () => {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Container;
