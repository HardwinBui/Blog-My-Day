import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './blog.css';
import { useParams, useNavigate } from "react-router";
import LoginWarning from "../Auth0/loginWarning";

const UserBlog = (props) => (
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

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userInfo, setUser] = useState([]);
  const params = useParams();
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`https://blogmydaybackend.onrender.com/blog/`);
      const responseUser = await fetch(`https://blogmydaybackend.onrender.com/user/`).then((async response => {
        var userList = await response.json();
        for (var i = 0; i < userList.length; i++) {
          if (userList[i].user === params.id) {
            setUser(userList[i]);
            break;
          }
        }
      }));

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      var records = await response.json();
      if (!isLoading && userInfo.user !== undefined) {
        records = records.filter(blog => blog.user === userInfo.user);
        setBlogs(records);
      }


      var date = new Date(userInfo.date_created);
      var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      setDate(date.toLocaleDateString());
      setTime(time);
    }

    getBlogs();

    return;
  }, [blogs.length, isAuthenticated, userInfo.length]);

  async function deleteBlog(id) {
    await fetch(`https://blogmydaybackend.onrender.com/blog/delete/${id}`, {
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
    !isAuthenticated && (<LoginWarning />)

    ||

    isAuthenticated && (
      <div class="page-container">
        <div>
          <div class="search-container">
            <h3>{userInfo.user}</h3>

            <Link to={`/createBlog`}>
              <button class="create-blog">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>     Create a Blog
              </button>
            </Link>
          </div>
          <h6><em>joined since {date} at {time}</em></h6>

          <br />
          <hr />

          <div class="bloginfo-container">
            <h4>Recent Blogs:</h4>
          </div>
          <br />
        </div>


        <div class="flex-container">
          {BlogList()}
        </div>
      </div>
    ));
}