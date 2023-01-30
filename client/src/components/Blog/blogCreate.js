import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function BlogCreate() {
  const { user } = useAuth0();
  const [form, setForm] = useState({
    user: user.email,
    name: "",
    likes: 0,
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch(error => {
        window.alert(error);
        return;
      });


    setForm({ name: "" });
    navigate("/userBlog");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div class="page-container">
      <h3>Create a New Blog</h3>
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
            value="Create Blog"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}