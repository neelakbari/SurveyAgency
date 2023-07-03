import React from "react";
import { logo } from "../assets";
import "../scss/RootLayout.scss";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
    const navigate = useNavigate()
  return (
    <>
      <div className="container-fulid">
        <nav className="header">
          <div className="logo_wrapper" onClick={()=>navigate("/")}>
            <img src={logo} alt="logo-image" height={"40px"} width={"40px"} />
            <span>SurveyAgency</span>
          </div>
          <div className="links_wrapper">
            <ul className="links">
              <li className="link">How it works?</li>
              <li className="link">About</li>
              <li className="link">Contact Us</li>
              <li className="link btn" onClick={()=>navigate("/login")}>
                <span>Login</span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
