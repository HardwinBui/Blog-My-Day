import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
 
const FeatureBlog = (props) => (
 <tr>
   <td>{props.record.title}</td>
   <td>{props.record.content}</td>
   <td>{props.record.likes}</td>
 </tr>
);

 
export default function RecordList() {
    const params = useParams();
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/post/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     //const
     var records = await response.json();
     console.log(Array.isArray(records));
     records = records.filter(post => post.blogID == params.id.toString());
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
   <div>
     <h3>View Blog</h3>

     <Link className="btn btn-link" to={`/createPost/${params.id.toString()}`}>Create Post</Link> 

     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Post Title</th>
           <th>Description</th>
           <th>Likes</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}