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
import mobileIcon from "../assets/mobiledesign.png";
import productIcon from "../assets/productdesign.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="avatar">
        <img src={avi} alt="no=avi" />
        <Link to="/home">
          <div className="details">
            <h4>Kaizer Soze</h4>
            <p>@K.soze</p>
          </div>
        </Link>
      </div>
      <div className="menu">
        <h2>MENU</h2>
        <div className="menuitem">
          <Link to="/timeline">
            <div className="menuitemleft">
              <img src={timelineIcon} alt="Timeline" />
              <span>Timeline</span>
            </div>
          </Link>
          <div className="menuItemRight"></div>
        </div>
        <Link to="/friends">
          <div className="menuitem">
            <div className="menuitemleft">
              <img src={friendsIcon} alt="Friends" />
              <span>Friends</span>
            </div>
            <div className="menuItemRight"></div>
          </div>
        </Link>
        <Link to="/groups">
          <div className="menuitem">
            <div className="menuitemleft">
              <img src={groupsIcon} alt="Groups" />
              <span>Groups</span>
            </div>
            <div className="menuItemRight"></div>
          </div>
        </Link>
        <div className="menuitem">
          <div className="menuitemleft">
            <img src={videosIcon} alt="Videos" />
            <span>Videos</span>
          </div>
          <div className="menuItemRight"></div>
        </div>

        <div className="menuitem">
          <Link to="/photos">
            <div className="menuitemleft">
              <img src={photosIcon} alt="Photos" />
              <span>Photos</span>
            </div>
          </Link>
          <div className="menuItemRight"></div>
        </div>

        <div className="menuitem">
          <div className="menuitemleft">
            <img src={eventsIcon} alt="Events" />
            <span style={{ color: "#ED4F9D" }}> Events</span>
          </div>
          <div className="menuItemRight">
            <span
              style={{
                color: "white",
                backgroundColor: "#ED4F9D",
                borderRadius: "50%",
                padding: "3px 5px",
              }}
            >
              10
            </span>
          </div>
        </div>
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
