import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
 
export default function CommentCreate() {
 const { user } = useAuth0();
 const params = useParams();
 const [form, setForm] = useState({
   postID: params.id,
   user: user.email,
   content: "",
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
 
   await fetch("https://blogmydaybackend.onrender.com/comment/add", {
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
   navigate(-1);
 }
 
 // This following section will display the form that takes the input from the user.
 return (
  <div class="page-container">
     <h3>Add a Comment</h3>
     <form onSubmit={onSubmit}>
     <br/>
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
       <br/>
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