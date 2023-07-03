import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import "../scss/WorkspaceLayout.scss"

const WorkspaceLayout = () => {
    const navigate = useNavigate("")
    const HandleLogOut =()=>{

    }
  return (
    <>
      <div className="layout">
        <div className="header ">
          <div className="logo_wrapper">
            <img src={logo} alt="logo" />
            <span>SurveyAgency</span>
          </div>
          <div className="right_loggedIn">
            <div className="right_loggedIn_user">
              <div className="right__loggedIn_user_profile"></div>
              <div className="right_loggedIn_user_name">
                Neel Akbari
              </div>
            </div>
            <Link className="logout_btn" to={"/"}>Logout</Link>
          </div>
        </div>
        <div className="layout_content">

        <Outlet />
        </div>
      </div>
    </>
  );
};

export default WorkspaceLayout;
