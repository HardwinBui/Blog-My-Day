import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateImage() {
  const [form, setForm] = useState({
    img: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
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
      <hr />
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
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