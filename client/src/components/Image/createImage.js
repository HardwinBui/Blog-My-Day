import React, { useState } from "react";
import { useNavigate } from "react-router";
import storage from "../../firbaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

export default function CreateImage() {
  const [form, setForm] = useState({
    img: null,
  });
  const navigate = useNavigate();
  const [percent, setPercent] = useState(0);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const [file, setFile] = useState("");

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!")
    }

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
        });
      }
    );
  }

  // Handles input change event and updates state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newImage = { ...form };

    await fetch("http://localhost:5000/image/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newImage),
    })
      .catch(error => {
        window.alert(error);
        return;
      });


    setForm({ name: "" });
    navigate("/");
  }

  return (
    <div class="page-container">
      <h3>Create a New Image</h3>

      <div>
        <input type="file" onChange={handleChange} accept="" />
        <button onClick={handleUpload}>Upload to Firebase</button>
        <p>{percent} "% done"</p>
{/*         <img src="https://firebasestorage.googleapis.com/v0/b/blog-my-day-7d858.appspot.com/o/files%2Fmain%201.png?alt=media&token=5c36afb5-f699-43ad-91d6-3a47ccd682f8" alt="Italian Trulli"></img>
 */}      </div>

      
      <hr />
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name">Title</label>
         
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Create Image"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}