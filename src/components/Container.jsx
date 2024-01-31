import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../styles/container.scss";
import Rightbar from "./Rightbar";
import Timeline from "../pages/Timeline";
import Friends from "../pages/Friends";

const Container = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>

        <Rightbar />
      </BrowserRouter>
    </div>
  );
};

export default Container;
