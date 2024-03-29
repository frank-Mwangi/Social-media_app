import React from "react";
import "../styles/sidebar.scss";
import avi from "../assets/avatar.png";
import timelineIcon from "../assets/timeline.png";
import friendsIcon from "../assets/friends.png";
import groupsIcon from "../assets/groups.png";
import videosIcon from "../assets/videos.png";
import photosIcon from "../assets/photos.png";
import eventsIcon from "../assets/events.png";
import websiteIcon from "../assets/websitedesign.png";
import productIcon from "../assets/productdesign.png";
import mobileIcon from "../assets/mobiledesign.png";
//import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    {
      icon: timelineIcon,
      label: "Timeline",
      link: "/timeline",
    },
    {
      icon: friendsIcon,
      label: "Friends",
      link: "/friends",
    },
    {
      icon: groupsIcon,
      label: "Groups",
      link: "/groups",
    },
    {
      icon: videosIcon,
      label: "Videos",
      link: "/videos",
    },
    {
      icon: photosIcon,
      label: "Photos",
      link: "/photos",
    },
    {
      icon: eventsIcon,
      label: "Events",
      link: "/events",
    },
  ];
  return (
    <div className="sidebar">
      <div className="avatar">
        <img src={avi} alt="no=avi" />
        <NavLink to="/home" style={{ textDecoration: "none" }}>
          <div className="details">
            <h4>Kaizer Soze</h4>
            <p>@K.soze</p>
          </div>
        </NavLink>
      </div>
      <div className="menu">
        <h2>MENU</h2>
        {menu &&
          menu.map((item, index) => {
            return (
              <div className="menuitem" key={index}>
                <NavLink to={item.link} end>
                  <div className="menuitemleft">
                    <img src={item.icon} alt="no-icon" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              </div>
            );
          })}
      </div>
      <div className="shortcuts">
        <h2>SHORTCUTS</h2>
        <div className="shortcut">
          <img src={websiteIcon} alt="no-icon" />
          <p>Website Design</p>
        </div>
        <div className="shortcut">
          <img src={mobileIcon} alt="no-icon" />
          <p>Mobile Design</p>
        </div>
        <div className="shortcut">
          <img src={productIcon} alt="no-icon" />
          <p>Product Design</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
