import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import storage from "../../firbaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";


export default function CreateBlog() {
  const { user } = useAuth0();
  const [form, setForm] = useState({
    user: user.nickname,
    name: "",
    description: "",
    img: "",
    likes: [],
    posts: [],
    followers: [],
    date_created: null,
    date_modified: null,
  });
  const navigate = useNavigate();

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

  const handleInputChange = (value) => {
    console.log(value);
    form.description = value;
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (form.description.length < 100) {
      // Process the input value
      alert('Input must be at least 100 characters long!');
      return;
    }

    if (!file) FinishSubmit();
    else handleUpload();
  }

  async function FinishSubmit() {

    form.date_created = new Date();
    const newBlog = { ...form };

    await fetch("http://localhost:5000/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    })
      .catch(error => {
        window.alert(error);
        return;
      });


    setForm({ name: "" });
    navigate("/userBlog");
  }

  return (
    <div class="page-container">
      <h3>Create a New Blog</h3>
      <hr />
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name" class="required-field">Title:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="name" class="required-field">Description:</label>
          <textarea
            type="text"
            className="form-control"
            id="name"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            required
            maxlength="1500" minlength="500"
          />
          <p align="right">Character Count: {form.description !== undefined ? (form.description.length) : (0)} / 1500</p>
        </div>
        

        <div className="form-group">
          <label htmlFor="name">Profile Image:</label>
          <br />
          <input type="file" onChange={handleChange} accept="" />
          <br />
          {percent > 0 && <p>{percent}% uploaded</p>}
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Create Blog"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}