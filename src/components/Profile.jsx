import React from "react";
import "../styles/profile.scss";
import CompleteProfile from "./CompleteProfile";
import Intro from "./Intro";
import NewPost from "./NewPost";
import Post from "./Post";
import Gallery from "./Gallery";

const Main = () => {
  return (
    <div className="main">
      <div className="profile-info">
        <CompleteProfile />
        <Intro />
        <div className="buttons">
          <h4>Photos</h4>
          <p>See all</p>
        </div>
        <Gallery />
      </div>
      <div className="timeline">
        <NewPost />
        <Post />
      </div>
    </div>
  );
};

export default Main;
