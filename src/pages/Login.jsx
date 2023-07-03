import React, { useState } from "react";
import "../scss/SignUp.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dataBase = JSON.parse(localStorage.getItem("dataBase"))
    const [currentuser, setCurrentUser] = useState({
      email: "",
      password: "",
      });
      
    const handleChange = (event,field) => {
      setCurrentUser({
        ...currentuser,
        [field]:event.target.value,
      })
    };
    const validateUser = ()=>{
      const isUser = dataBase.find((user)=>user.email === currentuser.email)
      isUser ? isUser?.password === currentuser.password ? (navigate("/workspace")(localStorage.setItem("currentUser",JSON.stringify(isUser)))) : alert("invalid username or password") : confirm("User not registered Wanna register?") ? navigate("/signup") : navigate("/")
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      validateUser();
    };
  return (
    <>
      <div className="login_wrapper">
        <span className="title">Login with your account</span>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={currentuser.email}
              onChange={(e)=>handleChange(e,"email")}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={currentuser.password}
              onChange={(e)=>handleChange(e,"password")}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
