import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../styles/container.scss";
import Rightbar from "./Rightbar";

const Container = () => {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
      <Rightbar />
    </div>
  );
};

export default Container;
