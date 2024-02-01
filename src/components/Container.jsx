import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../styles/container.scss";
import Rightbar from "./Rightbar";
import Timeline from "../pages/Timeline";
import Friends from "../pages/Friends";
import Navbar from "./Navbar";
import Login from "../pages/Login";

const Container = () => {
  return (
    <div className="wholepage">
      <Navbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home/" element={<MainContent />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>

        <Rightbar />
      </div>
    </div>
  );
};

export default Container;
