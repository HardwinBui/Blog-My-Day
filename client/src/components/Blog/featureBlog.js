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
/*  <tr>
   <td>{props.record.name}</td>
   <td>{props.record.user}</td>
   <td>{props.record.likes}</td>
   <td>
     <Link className="btn btn-link" to={`/viewBlog/${props.record._id}`}>Edit</Link> 
   </td>
 </tr> */
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/blog/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
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
     <h3>Featured Blogs</h3>
    <div class="flex-container">
      {recordList()}
    </div>

     {/* <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Likes</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table> */}
   </div>
 );
}