import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import '../../App.css';
 
const FeatureBlog = (props) => (
 <div>
    <br/><br/>
    <h2>{props.record.name}</h2>
    <br/><br/>
    <h5>by {props.record.user}</h5>
    <br/>
    <Link to={`/viewBlog/${props.record._id}`}>
        <button class="block">View Blog</button>
    </Link>
    <br/><br/>
      <Link onClick={() => { props.deleteRecord(props.record._id); }}>
        <button class="delete">Delete Blog</button>
      </Link>

    <br/><br/><br/>
  </div>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const { user, isAuthenticated, isLoading } = useAuth0();

 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/blog/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     
     var records = await response.json();
     if(!isLoading) 
        records = records.filter(blog => blog.user == user.email.toString());
     
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/blog/delete/${id}`, {
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

 if (isLoading) {
    return <div>Loading ...</div>;
  }
 // This following section will display the table with the records of individuals.
 return ( 
    !isAuthenticated && (
        <center>
            <h1>
                <br/><br/><br/><br/><br/>
                Please log in to use this feature!
            </h1>
        </center>
    ) 
    
    ||

    isAuthenticated && (
    <div class="page-container">
        <div>
            <h3>My Blogs</h3>
            <br/>
            <Link to={`/createBlog`}>
                <button class="block">Create Blog</button>
            </Link>
        </div>
        <div class="flex-container">
          {recordList()}
        </div>
   </div>
 ));
}