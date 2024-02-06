import React from "react";
import dots from "../assets/horizontal-dots.png";
import photo1 from "../assets/pic7.png";
import photo2 from "../assets/pic2.png";
import photo3 from "../assets/pic3.png";
import photo4 from "../assets/pic4.png";
import photo5 from "../assets/pic5.png";
import photo6 from "../assets/pic6.png";
import photo7 from "../assets/pic7.png";
import photo8 from "../assets/pic8.png";
import photo9 from "../assets/pic9.png";
import photo10 from "../assets/pic10.png";
import photo11 from "../assets/pic11.png";
import photo12 from "../assets/pic12.png";
import "./photos.scss";
import Gallery from "../components/Gallery";

const Photos = () => {
  const pics = [
    {
      img: photo1,
    },
    {
      img: photo2,
    },
    {
      img: photo3,
    },
    {
      img: photo4,
    },
    {
      img: photo5,
    },
    {
      img: photo6,
    },
    {
      img: photo7,
    },
    {
      img: photo8,
    },
    {
      img: photo9,
    },
    {
      img: photo10,
    },
    {
      img: photo11,
    },
    {
      img: photo12,
    },
  ];

  return (
    <div className="photos-page">
      <div className="top">
        <h1>Your Photos</h1>
        <span>
          <img src={dots} />
        </span>
      </div>
      <div className="mid">
        <span>Photos About You</span>
        <span>Your Photos</span>
        <span>Albums</span>
      </div>
      <div className="bottom">
        <h4>Total Photos</h4>
        <p>{pics.length} Total Photos About You</p>
      </div>
      <Gallery />
    </div>
  );
};

export default Photos;
