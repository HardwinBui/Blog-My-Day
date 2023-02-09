import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

import storage from "../../firbaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

export default function CreatePost() {
  const params = useParams();
  const { user } = useAuth0();
  const [form, setForm] = useState({
    blogID: params.id,
    user: user.nickname,
    title: "",
    content: "",
    img: "",
    likes: { '1': [], '-1': [] },
    comments: [],
    date_created: null,
    date_modified: null,
  });
  const navigate = useNavigate();
  const [blogInfo, setBlog] = useState([]);

  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");

  async function handleUpload() {
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          form.img = url;
          FinishSubmit();
        });
      }
    );
  }

  // Handles input change event and updates state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    async function getBlogData() {
      const responseBlog = await fetch(`http://localhost:5000/blog/${params.id}`);

      if (!responseBlog.ok) {
        const message = `An error occurred: ${responseBlog.statusText}`;
        window.alert(message);
        return;
      };

      // Set blog data
      var blog = await responseBlog.json();
      setBlog(blog);
    }

    getBlogData();

    return;
  }, [blogInfo.user]);

  async function onSubmit(e) {
    e.preventDefault();

    if (!file) FinishSubmit();
    else handleUpload();
  }

  async function FinishSubmit() {
    form.date_created = new Date();
    const newPost = { ...form };

    // Add post to database
    const postData = await fetch("http://localhost:5000/post/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then(async response => {
      // Try to add id to blog
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      var editedBlog = { ...blogInfo };
      editedBlog.posts.push(data.insertedId);
      await fetch(`http://localhost:5000/blog/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedBlog),
        headers: {
          'Content-Type': 'application/json'
        },
      });

    })
      .catch(error => {
        window.alert(error);
        return;
      });



    setForm({ name: "" });
    navigate(-1);
  }

  return (
    <div class="page-container">
      <h3>Create a New Post</h3>
      <hr />
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name" class="required-field">Title</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="name" class="required-field">Description</label>
          <textarea
            placeholder=""
            type="text"
            className="form-control"
            id="name"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="name">Image</label>
          <br />
          <input type="file" onChange={handleChange} accept="" />
          {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
          <br />
          <p>{percent}% uploaded</p>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Create Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}