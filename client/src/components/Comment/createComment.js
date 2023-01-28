import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
 
export default function CommentCreate() {
  const { user, isAuthenticated, isLoading } = useAuth0();
 const params = useParams();
 const [form, setForm] = useState({
   postID: params.id,
   user: user.email,
   content: "",
   likes: 0,
 });
 const navigate = useNavigate();

 

 const [notif, setNotif] = useState({
  user: params.id,
  detail: "",
});


const [verify, setUser] = useState([]);
const [postInfo, setPost] = useState([]);
const [blogInfo, setBlog] = useState([]);
var verifyBlog = false;

 // This method fetches the records from the database.
useEffect(() => {
async function getBlog() {
  const response = await fetch(`http://localhost:5000/post/${params.id}`);

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  var post = await response.json();
  setPost(post);

  if(postInfo.blogID !== undefined) {
    const response2 = await fetch(`http://localhost:5000/blog/${postInfo.blogID}`);
    var blog = await response2.json();
    setBlog(blog);
    updateNotif({user: blogInfo.user});

    if(isAuthenticated) {
      var msg = user.email.toString() + " made a comment to your post, " + postInfo.title;
      msg += ", in your blog, " + blogInfo.name + "!";
      updateNotif({detail: msg});
    }
  }
  

  // Checks if current user is the commenter
   if(!isLoading) {
     if(isAuthenticated) verifyBlog = blogInfo.user == user.email.toString();
     verifyBlog = verifyBlog && isAuthenticated;
     setUser(verifyBlog);
   } 
  } 

  getBlog();
  return;
  }, [postInfo.title, blogInfo.user, user]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 

 function updateNotif(value) {
  return setNotif((prev) => {
    return { ...prev, ...value };
  });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/comment/add", {
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

    
   const newNotif = { ...notif };
    if(!verify) {
      // set notification
      await fetch("http://localhost:5000/notification/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotif),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
    }
 
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