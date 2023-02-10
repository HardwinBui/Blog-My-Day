import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import storage from "../../firbaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";


export default function EditPost() {
  const [form, setForm] = useState({
    blogID: "",
    user: "",
    title: "",
    content: "",
    img: "",
    likes: [],
    comments: [],
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
      const response = await fetch(`http://localhost:5000/post/${params.id.toString()}`);

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

  function deleteImg() {
    updateForm({img: ""});
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!file) FinishSubmit();
    else handleUpload();
  }

  async function FinishSubmit() {
    form.date_modified = new Date();
    const editedPerson = { ...form };

    await fetch(`http://localhost:5000/post/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    setForm({ name: "" });
    navigate(-1);
  }

  return (
    <div class="page-container">
      <h3>Edit Post</h3>
      <hr />

      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name" class="required-field">Title: </label>
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
          <label htmlFor="name" class="required-field">Description: </label>
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
          <label htmlFor="name">Image:</label>
          <br />
          {form.img === "" &&
            <>
              <input type="file" onChange={handleChange} accept="" />
              <br />
              {percent > 0 && <p>{percent}% uploaded</p>}
            </>
          }
          {form.img !== "" &&
            <div class="clear-img-group">
              <br />
              <div class="image-small">
                <img src={form.img} alt="Image" />
              </div>
              <div class="clear-img">
                <button className="btn btn-danger" type="button" onClick={deleteImg}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}