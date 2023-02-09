import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditPost() {
  const [form, setForm] = useState({
    blogID: "",
    user: "",
    title: "",
    content: "",
    likes: [],
    comments: [],
    date_created: null,
    date_modified: null,
  });
  const params = useParams();
  const navigate = useNavigate();

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

  async function onSubmit(e) {
    e.preventDefault();
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
          <label htmlFor="name">Title: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="name">Content: </label>
          <textarea 
            placeholder=""
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
            value="Update Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}