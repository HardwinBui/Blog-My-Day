import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function ViewBlog() {
  const params = useParams();
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const [verify, setUser] = useState([]);
  const [blogInfo, setBlog] = useState([]);
  const [postList, setPosts] = useState([]);
  const [comment, setComments] = useState([]);


  useEffect(() => {
    async function getBlogData() {
      const responseBlog = await fetch(`http://localhost:5000/blog/${params.id}`);
      const responsePosts = await fetch(`http://localhost:5000/post/`);
      const responseComments = await fetch(`http://localhost:5000/comment`);

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
      if (!responseComments.ok) {
        const message = `An error occurred: ${responseComments.statusText}`;
        window.alert(message);
        return;
      }

      var blog = await responseBlog.json();
      setBlog(blog);

      var posts = await responsePosts.json();
      if (!isLoading)
        posts = posts.filter(post => post.blogID == params.id.toString());
      setPosts(posts);

      var comments = await responseComments.json();
      setComments(comments);
      

      if (!isLoading) {
        var verifyBlog = false;
        if (isAuthenticated)
          verifyBlog = blog.user == user.email.toString();
        verifyBlog = verifyBlog && isAuthenticated;
        setUser(verifyBlog);
      }
    }

    getBlogData();

    return;
  }, [blogInfo.user, postList.length, comment.length, isAuthenticated]);

  // API Functions -------------------------

  async function deletePostAPI(id) {
    await fetch(`http://localhost:5000/post/delete/${id}`, {
      method: "DELETE"
    });

    const newPosts = postList.filter((el) => el._id !== id);
    setPosts(newPosts);
  }

  async function deleteCommentAPI(id) {
    await fetch(`http://localhost:5000/comment/delete/${id}`, {
      method: "DELETE"
    });

    const newComments = comment.filter((el) => el._id !== id);
    setPosts(newComments);
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

  function addComment(props) {
    return (
      isAuthenticated &&
      <Link to={`/createComment/${props.record._id}`}>
        <button class="block">Add Comment</button>
      </Link>
    );
  }

  function deleteComment(id, owner) {
    return (
      owner &&
      <Link onClick={() => { deleteCommentAPI(id); }}>
        <button class="delete">Delete Comment</button>
      </Link>
    );
  }

  // Frontend structure -----------------------------------


  function mapComments(id, comm) {
    return comm.filter(x => x.postID == id.toString()).map((record) => {
      return (
        <div class="comment">

          <div>
            <h6><strong>{record.user}</strong></h6>
            <br />
            <h6>{record.content}</h6>
            <br />
            {deleteComment(record._id, user.email == record.user.toString())}
          </div>
        </div>
      );
    });
  }

  function printComments(id, comm) {
    return (
      <h5>{mapComments(id, comm)}</h5>
    );
  }

  const ViewBlog = (props) => (
    <div class="box-container">
      <br />
      <h4>{props.record.title}</h4>
      <br />
      <h6>{props.record.content}</h6>
      <br /><br /><br />
      {printComments(props.record._id.toString(), props.comment)}

      <br /><br />
      {addComment(props)}
      <br /><br />
      {editPost(props.record._id)}
      <br /><br />
      {deletePost(props.record._id)}
      <br /><br /><br />

    </div>
  );

  function blogList() {
    return postList.map((blogData) => {
      return (
        <ViewBlog
          record={blogData}
          deleteRecord={() => deletePostAPI(blogData._id)}
          key={blogData._id}
          comment={comment}
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