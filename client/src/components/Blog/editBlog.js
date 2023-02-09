import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import storage from "../../firbaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

export default function EditBlog() {
  const [form, setForm] = useState({
    user: "",
    name: "",
    description: "",
    img: "",
    likes: [],
    posts: [],
    followers: [],
    date_created: null,
    date_modified: null,
  });
  const params = useParams();
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

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/blog/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!file) FinishSubmit();
    else handleUpload();
  }

  async function FinishSubmit() {
    const editedBlog = {
      user: form.user,
      name: form.name,
      description: form.description,
      img: form.img,
      likes: form.likes,
      posts: form.posts,
      followers: form.followers,
      date_created: form.date_created,
      date_modified: new Date(),
    };

    await fetch(`http://localhost:5000/blog/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedBlog),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    setForm({ name: "" });
    navigate(-1);
  }

  return (
    <div class="page-container">
      <h3>Edit Blog</h3>
      <hr />
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name" class="required-field">Title: </label>
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
            maxlength="500" minlength="5"
          />
          <p align="right">Character Count: {form.description !== undefined ? (form.description.length) : (0)} / 500</p>
        </div>
        

        <div className="form-group">
          <label htmlFor="name">Profile Image:</label>
          <br />
          <input type="file" onChange={handleChange} accept="" />
          <br />
          <p>{percent}% uploaded</p>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Blog"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}