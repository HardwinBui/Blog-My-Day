import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

export default function CreateComment() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const params = useParams();
  const navigate = useNavigate();

  // Comment information
  const [form, setForm] = useState({
    postID: params.id,
    user: user.nickname,
    content: "",
    likes: {'-1': [], '1': []},
  });

  // Notification information
  const [notif, setNotif] = useState({
    user: params.id,
    detail: "",
  });

  const [verify, setUser] = useState([]);
  const [postInfo, setPost] = useState([]);
  const [blogInfo, setBlog] = useState([]);

  useEffect(() => {
    async function getBlog() {

      // Get post data
      const response = await fetch(`https://blogmydaybackend.onrender.com/post/${params.id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      var post = await response.json();
      setPost(post);

      // Get blog data
      if (postInfo.blogID !== undefined) {
        const response2 = await fetch(`https://blogmydaybackend.onrender.com/blog/${postInfo.blogID}`);
        var blog = await response2.json();
        setBlog(blog);
        updateNotif({ user: blogInfo.user });
        if (isAuthenticated) {
          var msg = user.email.toString() + " made a comment to your post, " + postInfo.title;
          msg += ", in your blog, " + blogInfo.name + "!";
          updateNotif({ detail: msg });
        }
      }

      // Check if current user is the commenter
      if (!isLoading) {
        if (isAuthenticated)
          verifyBlog = blogInfo.user == user.email.toString();
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
    const newComment = { ...form };
    await fetch("https://blogmydaybackend.onrender.com/comment/add", {
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

      var editedPost = { ...blogInfo };
      editedPost.comments.push(data.insertedId);
      await fetch(`https://blogmydaybackend.onrender.com/post/update/${params.id}`, {
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
    const newNotif = { ...notif };
    if (!verify) {
      await fetch("https://blogmydaybackend.onrender.com/notification/add", {
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
    navigate(-1);
  }


  return (
    <div class="page-container">
      <h3>Add a Comment</h3>
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name">Comment</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Add a Comment"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}