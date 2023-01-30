import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import '../../App.css';

const UserBlog = (props) => (
  <div>
    <br /><br />
    <h2>{props.record.name}</h2>
    <br /><br />
    <h5>by {props.record.user}</h5>
    <br />
    <Link to={`/viewBlog/${props.record._id}`}>
      <button class="block">View Blog</button>
    </Link>
    <br /><br />
    <Link to={`/editBlog/${props.record._id}`}>
      <button class="block">Edit Blog</button>
    </Link>
    <br /><br />
    <Link onClick={() => { props.deleteRecord(props.record._id); }}>
      <button class="delete">Delete Blog</button>
    </Link>

    <br /><br /><br />
  </div>
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
        records = records.filter(blog => blog.user == user.email.toString());

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