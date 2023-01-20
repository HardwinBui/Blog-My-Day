import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import '../../App.css';
 
const FeatureBlog = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.user}</td>
   <td>{props.record.likes}</td>
   <td>
     <Link className="btn btn-link" to={`/viewBlog/${props.record._id}`}>Edit</Link> 
   </td>
 </tr>
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
   <div>
        <div>
            <h3>My Blogs</h3>
            <Link className="btn btn-link" to={`/createBlog`}>Create Blog</Link> 
        </div>

     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Likes</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 ));
}