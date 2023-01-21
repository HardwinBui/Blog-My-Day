import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
 
const FeatureBlog = (props) => (
  <div class="box-container">
    <br/>
    <h2>{props.record.title}</h2>
    <br/>
    <h5>{props.record.content}</h5>

    <br/>
    <Link to={`/createComment/${props.record._id}`}>
        <button class="block">Add Comment</button>
    </Link>
    <br/><br/>
  </div>
);

 
export default function RecordList() {
 const params = useParams();
 const [records, setRecords] = useState([]);
 const { user, isAuthenticated, isLoading } = useAuth0();
 var blog = [];
 var testy = false;
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/post/`);
     const response2 = await fetch(`http://localhost:5000/blog/${params.id}`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     //const
     var records = await response.json();
     console.log(Array.isArray(records));
     if(!isLoading) 
        records = records.filter(post => post.blogID == params.id.toString());
     blog = await response2.json();
     //console.log("BLOG: " + blog.user);
     //console.log("USER: " + user.email);
     if(!isLoading) 
        testy = blog.user == user.email.toString();
     console.log("USER2: " + testy);
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <FeatureBlog
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
  
  <div class="page-container">
     <h3>View Blog</h3>

     {testy && 
      <Link to={`/createPost/${params.id.toString()}`}>
        <button class="block">Create Post</button>
      </Link>
      }

     <div class="box">
          {recordList()}
        </div>
   </div>
 );
}