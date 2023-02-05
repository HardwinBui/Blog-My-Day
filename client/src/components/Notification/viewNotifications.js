import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import '../../App.css';

const NotificationList = (props) => (
  <h5>
    <div class="post-block">
      <div>
        <h5>{props.record.detail}</h5>
        <h6><em>on {new Date(props.record.date_created).toLocaleDateString()} at
          {" " + new Date(props.record.date_created).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </em></h6>
      </div>
    </div>
  </h5 >
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();


  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://blogmydaybackend.onrender.com/notification/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      var records = await response.json();
      if (!isLoading) {
        records = records.filter(blog => blog.user == user.nickname);
        setRecords(records.reverse());
      }
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function clearNotifications() {
    console.log("called");
    for (var i = 0; i < records.length; i++) {
      await fetch(`https://blogmydaybackend.onrender.com/notification/delete/${records[i]._id}`, {
        method: "DELETE"
      });
    }

    const newRecords = records.filter((el) => el.user !== user.nickname);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <NotificationList
          record={record}
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
          <br /><br /><br /><br /><br />
          Please log in to use this feature!
        </h1>
      </center>
    )

    ||

    isAuthenticated && (
      <div class="page-container">
        <div class="search-container">
          <h3>Notifications</h3>

          <Link onClick={() => { clearNotifications(); }}>
            <button className="btn btn-danger">
              Clear all notifications
            </button>
          </Link>
        </div>
        <h6><em>Check out all of the notifications you missed!</em></h6>

        <br />
        <hr />
        <br />

        <div >
          {recordList()}
        </div>
      </div>
    ));
}