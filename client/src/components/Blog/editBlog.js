import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditBlog() {
  const [form, setForm] = useState({
    user: "",
    name: "",
    likes: [],
    posts: [],
    followers: [],
    date_created: null,
    date_modified: null,
  });
  const params = useParams();
  const navigate = useNavigate();

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
    const editedBlog = {
      user: form.user,
      name: form.name,
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
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label htmlFor="name">Name: </label>
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
            value="Update Blog"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}