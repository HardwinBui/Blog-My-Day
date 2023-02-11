import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate } from "react-router";

export default function NotificationDropdown() {
    const [openNotifs, setOpenNotifs] = React.useState(false);
    const [notifications, setNotifications] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const maxNotificationSize = 3;

    // This method fetches the records from the database.
    useEffect(() => {
        async function getNotifications() {
            const response = await fetch(`https://blogmydaybackend.onrender.com/notification/`);
            //console.log(notifications.length);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            var records = await response.json();
            if (!isLoading) {
                records = records.filter(blog => blog.user == user.nickname);
                setNotifications(records.reverse());
            }
            //console.log("testyu");
        }

        getNotifications();

        return;
    }, [notifications.length, isAuthenticated]);

    // This method will delete a record
    async function clearNotifications() {
        for (var i = 0; i < notifications.length; i++) {
            await fetch(`https://blogmydaybackend.onrender.com/notification/delete/${notifications[i]._id}`, {
                method: "DELETE"
            });
        }

        const newRecords = notifications.filter((el) => el.user !== user.nickname);
        setNotifications(newRecords);
    }

    const toggle = () => { }

    const onMouseEnter = () => {
        setOpenNotifs(true)
    }

    const onMouseLeave = () => {
        setOpenNotifs(false)
    }

    const ViewNotifications = () => {
        navigate("/notification");
        onMouseLeave();
    }

    function showNotifications() {
        return notifications.slice(0, maxNotificationSize).map((record) => {
            return (
                <DropdownItem header>
                    <div class="notif-dropdown" >
                        <h6>{record.detail}</h6>
                        <h6><em>on {new Date(record.date_created).toLocaleDateString()} at
                            {" " + new Date(record.date_created).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        </em></h6>
                    </div>
                </DropdownItem>
            );
        });
    }

    return (
        !isAuthenticated && (
            <></>
        )

        ||

        isAuthenticated && (
            <Dropdown className="d-inline-block" onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} isOpen={openNotifs} toggle={toggle}>
                {/* {notifications.length} */}
                <DropdownToggle tag="div" caret color="primary">
                    {notifications.length > 0 &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                        </svg>
                    }{notifications.length > 0 && " Notifications"}

                    {notifications.length <= 0 &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>
                    }{notifications.length <= 0 && " Notifications"}
                </DropdownToggle>
                <DropdownMenu>


                    <DropdownItem>
                        <div onClick={ViewNotifications}>
                            View {notifications.length} Notification{notifications.length !== 1 && "s"}
                        </div>
                    </DropdownItem>

                    <DropdownItem>
                        <div onClick={clearNotifications}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>  Clear All Notifications
                        </div>
                    </DropdownItem>

                    <DropdownItem divider />

                    {showNotifications()}



                </DropdownMenu>
            </Dropdown>
        )
    );
}