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
      setPosts(posts);

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
        <button class="block">Create Post</button>
      </Link>
    );
  }

  function editPost(id, owner) {
    return (
      verify &&
      <Link to={`/editPost/${id}`}>
        <button class="block">Edit Post</button>
      </Link>
    );
  }

  function deletePost(id) {
    return (
      verify &&
      <Link onClick={() => { deletePostAPI(id); }}>
        <button class="delete">Delete Post</button>
      </Link>
    );
  }

  // Frontend structure -----------------------------------


  const ViewBlog = (props) => (
    <div class="box-container">
      <br />
      <h4>{props.record.title}</h4>
      <br />
      <h6>{props.record.content}</h6>
      <br /><br /><br />

      <br /><br />
      {editPost(props.record._id)}
      <br /><br />
      {deletePost(props.record._id)}
      <br /><br /><br />
      <Link to={`/viewPost/${props.record._id}`}>
        <button class="block">View Post</button>
      </Link>

    </div>
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
      <h3>{blogInfo.name}</h3>
      <h5>by {blogInfo.user}</h5>
      <br />
      {createPost()}

      <div class="box">
        {blogList()}
      </div>
    </div>
  );
}