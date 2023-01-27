import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <br/><br/><br/>
  </div>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [searchInput, setSearchInput] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`https://blogmydaybackend.onrender.com/blog/`);
    
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     setSearchInput("");
 
     var records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`https://blogmydaybackend.onrender.com/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 async function filterSearch(filter) {
    setSearchInput(filter.target.value.toLowerCase());
 }

 // This method will map out the records on the table
 function recordList() {
   return records.filter(blog => blog.name.toLowerCase().startsWith(searchInput)).map((record) => {
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
     <h3>Featured Blogs</h3>

     <input
      type="search"
      placeholder="Search blog here"
      onChange={filterSearch}
      />

    <div class="flex-container">
      {recordList()}
    </div>
   </div>
 );
}