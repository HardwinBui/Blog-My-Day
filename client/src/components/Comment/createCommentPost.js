import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import './comment.css';

export default function CreateComment() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const params = useParams();
  const navigate = useNavigate();

  // Comment information
  const [form, setForm] = useState({
    postID: params.id,
    user: "",
    content: "",
    likes: {'-1': [], '1': []},
    date_created: null,
    date_modified: null,
  });

  // Notification information
  const [notif, setNotif] = useState({
    user: params.id,
    detail: "",
    date_created: null,
  });

  const [verify, setUser] = useState([]);
  const [postInfo, setPost] = useState([]);
  const [blogInfo, setBlog] = useState([]);

  useEffect(() => {
    async function getBlog() {

      // Get post data
      const response = await fetch(`http://localhost:5000/post/${params.id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      var post = await response.json();
      setPost(post);

      // Get blog data
      if (postInfo.blogID !== undefined) {
        const response2 = await fetch(`http://localhost:5000/blog/${postInfo.blogID}`);
        var blog = await response2.json();
        setBlog(blog);
        updateNotif({ user: blogInfo.user });
        if (isAuthenticated) {
          var msg = user.nickname + " commented on your post, " + postInfo.title;
          updateNotif({ detail: msg });
        }
      }

      // Check if current user is the commenter
      if (!isLoading) {
        if (isAuthenticated)
          verifyBlog = blogInfo.user == user.email.toString();
        updateForm({user: user.nickname})
        var verifyBlog = verifyBlog && isAuthenticated;
        setUser(verifyBlog);
      }
    }

    getBlog();
    return;
  }, [postInfo.title, blogInfo.user, user]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function updateNotif(value) {
    return setNotif((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Add the new comment to the database
    form.date_created = new Date();
    const newComment = { ...form };
    await fetch("http://localhost:5000/comment/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    }).then(async response => {
      // Try to add id to blog
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      var editedPost = { ...postInfo };
      editedPost.comments.push(data.insertedId);
      await fetch(`http://localhost:5000/post/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedPost),
        headers: {
          'Content-Type': 'application/json'
        },
      });

    })
      .catch(error => {
        window.alert(error);
        return;
      });


    // Create a notification
    notif.date_created = new Date();
    const newNotif = { ...notif };
    if (!verify) {
      await fetch("http://localhost:5000/notification/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotif),
      })
        .catch(error => {
          window.alert(error);
          return;
        });
    }

    setForm({ name: "" });
    navigate(0);
  }


  return (
    <div >
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <textarea 
            placeholder="What are your thoughts?"
            type="text"
            className="form-control"
            id="name"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className="comment-button" align="right">
          <input
            type="submit"
            value="Write a Comment"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}