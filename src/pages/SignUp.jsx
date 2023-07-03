import React, { useState } from "react";
import "../scss/SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dataBase = JSON.parse(localStorage.getItem("dataBase")) || [];
  const [user, setUser] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    password: "",
    data:[],
  });
  const handleChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dataBase.push(user);
    localStorage.setItem("dataBase", JSON.stringify(dataBase));
    if (true) {
      toast.success("Sign Up Successfull !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        style: { width: "500px" },
        closeButton: false,
      });
    }
    setUser({
      id: uuidv4(),
      name: "",
      email: "",
      password: "",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      <div className="signup_wrapper">
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              id="name"
              value={user.name}
              onChange={(e) => handleChange(e, "name")}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => handleChange(e, "email")}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => handleChange(e, "password")}
              required
            />
          </div>
          <div className="align_right">
            <span>
              <Link to={"/login"}>
                already a user? login <strong>HERE</strong>
              </Link>
            </span>
          </div>
          <button type="submit">Sign In</button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default SignUp;
