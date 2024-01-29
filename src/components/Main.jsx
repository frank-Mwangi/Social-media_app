import React from "react";
import "../styles/main.scss";
import CompleteProfile from "./CompleteProfile";
import Intro from "./Intro";
import NewPost from "./NewPost";
import Post from "./Post";

const Main = () => {
  return (
    <div className="main">
      <div className="profile-info">
        <CompleteProfile />
        <Intro />
      </div>
      <div className="timeline">
        <NewPost />
        <Post />
      </div>
    </div>
  );
};

export default Main;
