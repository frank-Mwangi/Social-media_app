import React from "react";
import timelineIcon from "../assets/timeline.png";
import friendsIcon from "../assets/friends.png";
import groupsIcon from "../assets/groups.png";
import videosIcon from "../assets/videos.png";
import photosIcon from "../assets/photos.png";
import eventsIcon from "../assets/events.png";
import "../styles/menu.scss";
const Menu = () => {
  const menuItems = [
    {
      id: 0,
      icon: timelineIcon,
      title: "Timeline",
    },
    {
      id: 1,
      icon: friendsIcon,
      title: "Friends",
    },
    {
      id: 2,
      icon: groupsIcon,
      title: "Groups",
    },
    {
      id: 3,
      icon: videosIcon,
      title: "Videos",
    },
    {
      id: 4,
      icon: photosIcon,
      title: "Photos",
    },
    {
      id: 5,
      icon: eventsIcon,
      title: "Events",
      value: 10,
    },
  ];

  return (
    <div className="menu">
      <h2>MENU</h2>
      {menuItems &&
        menuItems.map((item, index) => {
          return (
            <div className="menuitem" key={index}>
              <div className="menuitemleft">
                <img src={item.icon} alt={item.title} />
                {item.value ? (
                  <span style={{ color: "#2563EB" }}> {item.title}</span>
                ) : (
                  <span className="noNotifStyle">{item.title}</span>
                )}
              </div>
              <div className="menuItemRight">
                {item.value ? (
                  <>
                    {item.value && (
                      <span
                        style={{
                          color: "#2563EB",
                          backgroundColor: "#EFF6FF",
                          borderRadius: "5px",
                          padding: "3px 5px",
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {item.value && <span className="value">{item.value}</span>}
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Menu;
