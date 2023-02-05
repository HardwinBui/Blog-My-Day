import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import './blog.css';
import ViewPostList from "../Post/viewPostList";

export default function ViewBlog() {
  const params = useParams();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [verify, setUser] = useState([]);
  const [blogInfo, setBlog] = useState([]);
  const [postList, setPosts] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function getBlogData() {
      const responseBlog = await fetch(`http://localhost:5000/blog/${params.id}`);
      const responsePosts = await fetch(`http://localhost:5000/post/`);

      if (!responseBlog.ok) {
        const message = `An error occurred: ${responseBlog.statusText}`;
        window.alert(message);
        return;
      }
      if (!responsePosts.ok) {
        const message = `An error occurred: ${responsePosts.statusText}`;
        window.alert(message);
        return;
      }

      // Set blog data
      var blog = await responseBlog.json();
      setBlog(blog);
      // Set post data
      var posts = await responsePosts.json();
      posts = posts.filter(post => post.blogID == params.id.toString());
      setPosts(posts.reverse());

      var date = new Date(blogInfo.date_created);
      var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      setDate(date.toLocaleDateString());
      setTime(time);

      // Verify user
      if (!isLoading) {
        var verifyBlog = false;
        if (isAuthenticated)
          verifyBlog = blog.user == user.nickname.toString();
        verifyBlog = verifyBlog && isAuthenticated;
        setUser(verifyBlog);
      }
    }

    getBlogData();

    return;
  }, [blogInfo.user, postList.length, isAuthenticated, date, time]);

  // API Functions -------------------------

  async function deletePostAPI(id) {
    await fetch(`http://localhost:5000/post/delete/${id}`, {
      method: "DELETE"
    });

    const newPosts = postList.filter((el) => el._id !== id);
    setPosts(newPosts);
  }

  async function toggleFollow() {
    var editedBlog = { ...blogInfo };
    if (editedBlog.followers.includes(user.nickname)) {
      editedBlog.followers = editedBlog.followers.filter(e => e !== user.nickname);
    }
    else {
      editedBlog.followers.push(user.nickname);
    }

    await fetch(`http://localhost:5000/blog/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedBlog),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    setBlog(editedBlog);
  }

  // Option Functions ----------------------------

  function createPost() {
    return (
      verify &&
      <Link to={`/createPost/${params.id.toString()}`}>
        <div className="comment-button" align="right">
          <input
            type="submit"
            value="Make a Post"
            className="btn btn-primary"
          />
        </div>
      </Link>
    );
  }

  function followBlog() {
    return (
      isAuthenticated &&
      <Link onClick={() => { toggleFollow() }}>
        {blogInfo.followers !== undefined && !blogInfo.followers.includes(user.nickname) &&
          <button class="like-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
          </button>
        }

        {blogInfo.followers !== undefined && blogInfo.followers.includes(user.nickname) &&
          <button class="like-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </button>
        }
      </Link>
    );
  }

  async function deleteBlog(id) {
    await fetch(`http://localhost:5000/blog/delete/${params.id}`, {
      method: "DELETE"
    });

    navigate('/');
  }

  function viewUser() {
    return (
      <Link to={`/userBlog/${blogInfo.user}`}>
        <button class="rise-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
        </button>
      </Link>
    );
  }

  // Frontend structure -----------------------------------

  return (
    <div class="page-container">

      <div class="toprow">
        <div class="likes-container">
          {followBlog()}
          <h3 class="post-title">{blogInfo.name}</h3>
        </div>

        {verify && (<div>
          {viewUser()}

          <Link to={`/editBlog/${params.id}`}>
            <button class="edit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </button>
          </Link>

          <Link onClick={() => { deleteBlog(); }}>
            <button class="delete-icon-post">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
          </Link>
        </div>
        )}
      </div>


      <h5>by {blogInfo.user} | <em>created on {date} at {time} {blogInfo.date_modified !== null && "(edited)"}</em></h5>

      <br />
      <hr />
      <br />

      <div class="info-container">
        <div class="icon-spacer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
          </svg>

        </div>
        <div><h5>
          {blogInfo.posts !== undefined && blogInfo.posts.length + ' '}
          {blogInfo.posts === undefined && '0 '}
          post
          {blogInfo.posts !== undefined && blogInfo.posts.length !== 1 && 's'}
          {blogInfo.posts === undefined && 's'}
        </h5></div>
        <div><p></p></div>
      </div>


      {createPost()}
      <br /><br />

      <ViewPostList />
    </div>
  );
}