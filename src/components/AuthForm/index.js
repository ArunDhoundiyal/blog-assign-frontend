import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const onClickRegistrationButton = () => {
    navigate("/registration");
  };
  const onClickLoginButton = () => {
    navigate("/login");
  };
  return (
    <div className="auth-container">
      <div className="auth-content">
        <h6>
          Get Started <span className="blogs">BLOGS</span>
        </h6>
        <h2>Publish Your Passion in Your Own Way</h2>
        <p>It’s Free</p>

        <div className="auth-buttons">
          <button className="register-btn" onClick={onClickRegistrationButton}>
            Register
          </button>
          <button className="login-btn" onClick={onClickLoginButton}>
            Login
          </button>
        </div>

        <div className="continue-with-phone">
          <span className="phone-icon">📞</span>
          <span>Continue with Phone No.</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
