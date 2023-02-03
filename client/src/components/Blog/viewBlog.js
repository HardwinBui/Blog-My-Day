import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import './blog.css';

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
  }, [blogInfo.user, postList.length, isAuthenticated]);

  // API Functions -------------------------

  async function deletePostAPI(id) {
    await fetch(`http://localhost:5000/post/delete/${id}`, {
      method: "DELETE"
    });

    const newPosts = postList.filter((el) => el._id !== id);
    setPosts(newPosts);
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
      verify &&
      <Link onClick={() => { }}>
        <button class="like-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
          </svg>
        </button>

        <button class="like-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </button>
      </Link>
    );
  }

  async function deleteBlog(id) {
    await fetch(`http://localhost:5000/blog/delete/${params.id}`, {
      method: "DELETE"
    });

    navigate('/');
  }

  // Frontend structure -----------------------------------


  const ViewBlog = (props) => (
    <h5>
    <Link to={`/viewPost/${props.record._id}`}>
      
        <div class="comment">
          <div>
            <h4>{props.record.title}</h4>
            <h6>by {props.record.user} | <em>posted on {date} at {time} {props.record.date_modified !== null && "(edited)"}</em></h6>
            <br />
            <h6>{props.record.content}</h6>
            <br />

            <div class="info-container">
              <div class="icon-spacer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                </svg>
              </div>
              <div><h6>
                {props.record.comments !== undefined && props.record.comments.length + ' '}
                {props.record.comments === undefined && '0 '}
                comment
                {props.record.comments !== undefined && props.record.comments.length !== 1 && 's'}
                {props.record.comments === undefined && 's'}
              </h6></div>

              <div class="icon-spacer2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                </svg>
              </div>

              <div><h6>
                {props.record.comments !== undefined && props.record.likes['1'].length - props.record.likes['-1'].length + ' '}
                {props.record.comments === undefined && '0 '}
                like
                {props.record.comments !== undefined && props.record.likes['1'].length - props.record.likes['-1'] !== 1 && 's'}
                {props.record.comments === undefined && 's'}
              </h6></div>

            </div>
          </div>
        </div>
      


    </Link>
    </h5>
  );

  function blogList() {
    return postList.map((blogData) => {
      return (
        <ViewBlog
          record={blogData}
          deleteRecord={() => deletePostAPI(blogData._id)}
          key={blogData._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div class="page-container">

      <div class="toprow">
        <div class="likes-container">
          {followBlog()}
          <h3 class="post-title">{blogInfo.name}</h3>
        </div>

        {verify && (<div>
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


      <div >
        {blogList()}
      </div>
    </div>
  );
}