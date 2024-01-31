import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../styles/container.scss";
import Rightbar from "./Rightbar";
import Timeline from "../pages/Timeline";

const Container = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>

        <Rightbar />
      </BrowserRouter>
    </div>
  );
};

export default Container;
