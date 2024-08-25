import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://user-blogs-authentication.onrender.com/blogs`,
          {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          }
        );
        setBlogs(response.data); // Assuming response.data contains the list of blogs
      } catch (error) {
        setError("Failed to fetch blogs.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [loginData.token]);

  const onClickBlogPage = () => {
    navigate("/blog");
  };

  return (
    <div className="home-container">
      <header className="header">
        <p className="header-blog-paragraph">ZuAI Blogs</p>
        <p className="email-sty">{loginData.email}</p>
      </header>

      <main className="main-content">
        <section className="section">
          {loading ? (
            <p>Loading blogs...</p>
          ) : error ? (
            <p>{error}</p>
          ) : blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <ul className="all-list-data">
              {blogs.map((blog) => (
                <li className="all-list" key={blog.blog_id}>
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  <p>Created at: {blog.created_at}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        <button className="create-blog-button" onClick={onClickBlogPage}>
          Create Blog
        </button>
      </footer>
    </div>
  );
};

export default Home;
