import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
 
 
// This method will map out the records on the table
function mapComments(id, comm) {
  return comm.filter(x => x.postID == id.toString()).map((record) => {
    return (
      <div class="comment">
        
        <div>
          <h7><strong>{record.user}</strong></h7>
          <br/><br/>
          <h7>{record.content}</h7>
        </div>
      </div>
    );
  });
}

function printComments(id, comm) {
  return (
    <h5>{mapComments(id, comm)}</h5>
  );
 }
 

export default function RecordList() {
 const params = useParams();
 const [records, setRecords] = useState([]);
 const { user, isAuthenticated, isLoading } = useAuth0();
 const [verify, setUser] = useState([]);
 var blog = [];
 var verifyBlog = false;
 const [comment, setComments] = useState([]);
 const [blogInfo, setBlog] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`https://blogmydaybackend.onrender.com/post/`);
     const response2 = await fetch(`https://blogmydaybackend.onrender.com/blog/${params.id}`);
     const response3 = await fetch(`https://blogmydaybackend.onrender.com/comment`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     if (!response3.ok) {
      const message = `An error occurred: ${response3.statusText}`;
      window.alert(message);
      return;
    }

     var records = await response.json();
     //console.log(Array.isArray(records));
     if(!isLoading && isAuthenticated) 
        records = records.filter(post => post.blogID == params.id.toString());
     blog = await response2.json();
     setBlog(blog);
     
     if(!isLoading) {
        if(isAuthenticated)
          verifyBlog = blog.user == user.email.toString();
        verifyBlog = verifyBlog && isAuthenticated;
        setUser(verifyBlog);
      }
     //console.log("USER2: " + verifyBlog);
      
     var com = await response3.json();
     setComments(com);

      setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`https://blogmydaybackend.onrender.com/post/delete/${id}`, {
     method: "DELETE"
   });
   
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }

 function deletePost(id) {
  return (
    verify && 
      <Link onClick={() => { deleteRecord(id); }}>
        <button class="delete">Delete Post</button>
      </Link>
  );
 }

 function addComment(props) {
  return (
    isAuthenticated && 
    <Link to={`/createComment/${props.record._id}`}>
        <button class="block">Add Comment</button>
    </Link>
  );
 }

 const FeatureBlog = (props) => (
  <div class="box-container">
    <br/>
    <h4>{props.record.title}</h4>
    <br/>
    <h7>{props.record.content}</h7>
    <br/><br/><br/>
    {printComments(props.record._id.toString(), props.comment)}

    <br/>
    {deletePost(props.record._id)}
    <br/><br/>
    {addComment(props)}
    <br/><br/>
    
  </div>
);
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <FeatureBlog
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
         comment={comment}
       />
     );
   });
 }

 function createPost() {
  return (
    verify && 
      <Link to={`/createPost/${params.id.toString()}`}>
        <button class="block">Create Post</button>
      </Link>
  );
 }
 
 // This following section will display the table with the records of individuals.
 return (
  
  <div class="page-container">
     <h3>{blogInfo.name}</h3>

     {createPost()}

     <div class="box">
        {recordList()}
      </div>
   </div>
 );
}