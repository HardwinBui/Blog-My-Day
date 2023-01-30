import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

const FeatureBlog = (props) => (
  <div>
    <br /><br />
    <h2>{props.record.name}</h2>
    <br /><br />
    <h5>by {props.record.user}</h5>
    <br />
    <Link to={`/viewBlog/${props.record._id}`}>
      <button class="block">View Blog</button>
    </Link>
    <br /><br /><br />
  </div>
);

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`http://localhost:5000/blog/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setSearchInput("");

      var records = await response.json();
      setBlogs(records);
    }

    getBlogs();

    return;
  }, [blogs.length]);

  async function deleteBlog(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newBlogs = blogs.filter((el) => el._id !== id);
    setBlogs(newBlogs);
  }

  async function filterSearch(filter) {
    setSearchInput(filter.target.value.toLowerCase());
  }

  function blogList() {
    return blogs.filter(blog => blog.name.toLowerCase().startsWith(searchInput)).map((record) => {
      return (
        <FeatureBlog
          record={record}
          deleteRecord={() => deleteBlog(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div class="page-container">
      <h3>Featured Blogs</h3>

      <input
        type="search"
        placeholder="Search blog here"
        onChange={filterSearch}
      />

      <div class="flex-container">
        {blogList()}
      </div>
    </div>
  );
}