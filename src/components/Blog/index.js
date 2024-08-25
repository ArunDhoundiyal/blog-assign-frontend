import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import axios from "axios";

const Blog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      blogId: uuidv4(),
      title: formData.title,
      content: formData.content,
    };

    try {
      const blogResponse = await axios.post(
        `https://user-blogs-authentication.onrender.com/create_blog`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        }
      );
      if (blogResponse.status === 201) {
        setMessage(blogResponse.data);
        setFormData({ title: "", content: "" });
      }

      console.log(blogResponse);
    } catch (error) {
      setMessage("Failed to create blog. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="blog-form-container">
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
        <span className="msg-style">{message}</span>
      </form>
    </div>
  );
};

export default Blog;
