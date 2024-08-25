// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import Registration from "./components/Registration";
import Blog from "./components/Blog";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth_form" element={<AuthForm />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
