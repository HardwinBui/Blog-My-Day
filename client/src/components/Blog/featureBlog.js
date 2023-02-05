import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

const FeatureBlog = (props) => (
  <Link to={`/viewBlog/${props.record._id}`}>
    <div class="flex-entry">

      <br /><br />
      <h2>{props.record.name}</h2>
      <br />
      <h5>by {props.record.user}</h5>

      <h6><em>created on {new Date(props.record.date_created).toLocaleDateString()}</em></h6>

      <br />

      <div class="blogcard-container">
        <div class="icon-spacer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
          </svg>
        </div>
        <div><h6>
          {props.record.followers !== undefined && props.record.followers.length + ' '}
          {props.record.followers === undefined && '0 '}
          follower
          {props.record.followers !== undefined && props.record.followers.length !== 1 && 's'}
          {props.record.followers === undefined && 's'}
        </h6></div>

        <div class="icon-spacer2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
          </svg>
        </div>

        <div><h6>
          {props.record.posts !== undefined && props.record.posts.length + ' '}
          {props.record.posts === undefined && '0 '}
          post
          {props.record.posts !== undefined && props.record.posts.length !== 1 && 's'}
          {props.record.posts === undefined && 's'}
        </h6></div>

      </div>

    </div>
  </Link>
);

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [filter, setFilter] = useState([]);

  function sortByFollowers(a, b) {
    if (a.followers.length === b.followers.length)
      return a.posts.length - b.posts.length;
    return a.followers.length - b.followers.length;
  }

  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`https://blogmydaybackend.onrender.com/blog/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setSearchInput("");

      var records = await response.json();
      setBlogs(records.sort(sortByFollowers).reverse());
    }

    getBlogs();

    return;
  }, [blogs.length]);

  async function filterSearch(filter) {
    setFilter(filter);
    //setSearchInput(filter.target.value.toLowerCase());
  }

  const UpdateFilter = () => {
    setSearchInput(filter.target.value.toLowerCase());
  }

  function blogList() {
    return blogs.filter(blog => blog.name.toLowerCase().startsWith(searchInput)).map((record) => {
      return (
        <FeatureBlog
          record={record}
          key={record._id}
        />
      );
    });
  }

  return (
    <div class="page-container">
      <div class="search-container">
        <div><h3>Featured Blogs</h3></div>

        <div class="form-field">
          <input
            type="search"
            placeholder="Search blog here"
            onChange={filterSearch}
          />
          <button class="search" onClick={UpdateFilter}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
      <h6><em>Click on any blog you find interesting and explore!</em></h6>

      <br />
      <hr />
      <br />
      <div class="flex-container">
        {blogList()}
      </div>
    </div>
  );
}