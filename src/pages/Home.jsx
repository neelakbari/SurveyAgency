import React from "react";
import "../scss/Home.scss";
import { home_bg } from "../assets";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate()
  return (
    <>
      <div className="home_wrapper">
        <div className="text_wrapper">
          <div className="title">There's a better way to ask</div>
          <div className="description">
            You don't want to make a boring form. And your audience won't answer
            one. Create a typeform instead—and make everyone happy.
          </div>
          <div className="home_btn" onClick={()=>navigate("signup")}>
            <span>Let's get started</span>
          </div>
        </div>
        <div className="image_wrapper">
          <img src={home_bg} alt="backgroung img" />
        </div>
      </div>
    </>
  );
};

export default Home;
