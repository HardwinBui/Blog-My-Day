import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import ViewPost from "./viewPost";
import ViewPostList from "./viewPostList";


const FeatureBlog = (props) => (
  <div>
    <br /><br />
    <h2>{props.record.name}</h2>
    <br /><br />
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


  async function filterSearch(filter) {
    setSearchInput(filter.target.value.toLowerCase());
  }

  return (
    <div class="page-container">
      <h3>Most Recent Posts</h3>
      <h6><em>Click on any post you find interesting and explore!</em></h6>

      <br />
      <hr />
      <br />
      <ViewPostList />
    </div>
  );
}