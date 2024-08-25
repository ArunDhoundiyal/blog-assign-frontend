import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [registrationMsg, setRegistrationMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userForm = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://user-blogs-authentication.onrender.com/user_registration",
        userForm
      );
      console.log(response.status);
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationMsg(
        "Error while user registration or User already exists"
      );
    }
  };

  return (
    <div className="form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Register
        </button>
        <span className="error-msg">{registrationMsg}</span>
      </form>
    </div>
  );
};

export default Registration;
