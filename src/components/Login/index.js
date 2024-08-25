import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginMsg, setLoginMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: credentials.email,
      password: credentials.password,
    };
    try {
      const loginResponse = await axios.post(
        `https://user-blogs-authentication.onrender.com/user_login`,
        loginData
      );
      console.log(loginResponse);
      if (loginResponse.data) {
        localStorage.setItem("loginData", JSON.stringify(loginResponse.data));
        navigate("/");
        setCredentials({
          email: "",
          password: "",
        });
      }

      console.log(loginResponse.data);
    } catch (error) {
      console.error("Error during login:", error);
      setLoginMsg(
        "Error login due to Invalid password or user does not exist or Server Error"
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
        <span className="error-msg">{loginMsg}</span>
      </form>
    </div>
  );
};

export default Login;
