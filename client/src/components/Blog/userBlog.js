import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import '../../App.css';

const UserBlog = (props) => (
  <Link to={`/viewBlog/${props.record._id}`}>
    <div class="flex-entry">

      <div class="settings-flex">

        <Link onClick={() => { props.deleteRecord(props.record._id); }}>
          <button class="option-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </Link>

        <Link to={`/editBlog/${props.record._id}`}>
          <button class="option-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </button>
        </Link>

      </div>


      <h2>{props.record.name}</h2>
      <br />
      <h5>by {props.record.user}</h5>
      <br />
      <br /><br />


    </div>
  </Link>
);

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`http://localhost:5000/blog/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      var records = await response.json();
      if (!isLoading)
        records = records.filter(blog => blog.user == user.nickname.toString());

      setBlogs(records);
    }

    getBlogs();

    return;
  }, [blogs.length]);

  async function deleteBlog(id) {
    await fetch(`http://localhost:5000/blog/delete/${id}`, {
      method: "DELETE"
    });

    const newRecords = blogs.filter((el) => el._id !== id);
    setBlogs(newRecords);
  }

  function BlogList() {
    return blogs.map((record) => {
      return (
        <UserBlog
          record={record}
          deleteRecord={() => deleteBlog(record._id)}
          key={record._id}
        />
      );
    });
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    !isAuthenticated && (
      <center>
        <h1>
          <br /><br /><br /><br /><br />
          Please log in to use this feature!
        </h1>
      </center>
    )

    ||

    isAuthenticated && (
      <div class="page-container">
        <div>
          <h3>My Blogs</h3>
          <br />
          <Link to={`/createBlog`}>
            <button class="block">Create Blog</button>
          </Link>
        </div>
        <div class="flex-container">
          {BlogList()}
        </div>
      </div>
    ));
}