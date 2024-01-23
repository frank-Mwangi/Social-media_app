import React from "react";
import websiteIcon from "../assets/website.png";
import mobileIcon from "../assets/mobile.png";
import productIcon from "../assets/product.png";
import "../styles/shortcuts.scss";

const Shortcuts = () => {
  const shortcuts = [
    {
      icon: websiteIcon,
      title: "Website Design",
    },
    {
      icon: mobileIcon,
      title: "Mobile Design",
    },
    {
      icon: productIcon,
      title: "Product Design",
    },
  ];
  return (
    <div className="shortcuts">
      <h2>SHORTCUTS</h2>
      {shortcuts &&
        shortcuts.map((item, index) => {
          return (
            <div className="shortcut" key={index}>
              <img src={item.icon} alt="no-icon" />
              {item.title}
            </div>
          );
        })}
    </div>
  );
};

export default Shortcuts;
