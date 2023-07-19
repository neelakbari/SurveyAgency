import { useNavigate } from 'react-router-dom';
  import React, { useState } from "react";
  import "../scss/SignUp.scss";


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
      const validateUser = () => {
        
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        const isUser = dataBase.find((user) => user.email === currentuser.email);
        // if(isUser){

        //   if(isUser.password === currentuser.password){
        //     console.log(isUser)
        //     navigate("/workspace")
        //     localStorage.setItem("currentUser", JSON.stringify(isUser))
        //   }else{
        //     alert("Invalid username or password")
        //   }
        // }else{
        //   confirm("User not registered. Wanna register?")
        //   ? navigate("/signup")()
        //   : navigate("/")();
        // }
        isUser
          ? isUser?.password === currentuser.password
            ? (navigate('/workspace'), localStorage.setItem("currentUser", JSON.stringify(isUser)))
            : alert("Invalid username or password")
          : confirm("User not registered. Wanna register?")
          ? navigate("/signup")()
          : navigate("/")();
      };
    return (
      <>
        <div className="login_wrapper">
          <span className="title">Login with your account</span>
          <form >
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
            <button type="submit" onClick={handleSubmit}>Log In</button>
          </form>
        </div>
      </>
    );
  };

  export default Login;
