import "bootstrap/dist/css/bootstrap.css";

// Auth0 imports
import LoginButton from '../Auth0/loginButton';
import LogoutButton from '../Auth0/logoutButton';
import { useAuth0 } from "@auth0/auth0-react";

import './navbar.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link } from "react-router-dom";
import CreateUser from "../Auth0/createUser";
import { useNavigate } from "react-router";
import NotificationDropdown from "../Notification/notificationDropdown";
import React, { useEffect, useState } from "react";
import useWindowDimensions from '../useWindowDimensions';


// Here, we display our Navbar
export default function Navigation() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const toggle = () => { }

  const onMouseEnterBlogs = () => {
    setOpen(true)
    console.log("true");
  }

  const onMouseLeaveBlogs = () => {
    //console.log("false");
    setOpen(false)
  }

  const FeaturedBlogs = () => {
    navigate("/");
    onMouseLeaveBlogs();
  }

  const FollowedBlogs = () => {
    navigate("/followedBlog");
    onMouseLeaveBlogs();
  }

  const RecentPosts = () => {
    navigate("/recentPosts");
    onMouseLeaveBlogs();
  }

  const ViewNotifications = () => {
    navigate("/notification");
    onMouseLeaveBlogs();
  }

  const UserBlog = () => {
    var link = "/userBlog/";
    if(isAuthenticated) link += user.nickname;
    else link += "null";
    navigate(link);
    onMouseLeaveBlogs();
  }

  function NormalWidthNav() {
    return (

      <div class="nav">
        <CreateUser />
        <div>
          <span class="title">
            <Link to='/'>
              Blog My Day
            </Link>
          </span>

          <span class="vl"></span>

          
          <span class="dropdown">
            <Dropdown className="d-inline-block" onMouseOver={onMouseEnterBlogs} onMouseLeave={onMouseLeaveBlogs} isOpen={open} toggle={toggle}>
              <DropdownToggle tag="div" caret color="primary">
                View Blogs
              </DropdownToggle>
              <DropdownMenu>

                <DropdownItem>
                  <div onClick={FeaturedBlogs}>
                    Featured Blogs
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div onClick={FollowedBlogs}>
                    Followed Blogs
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div onClick={RecentPosts}>
                    Recent Posts
                  </div>
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </span>


          <span class="navopt">
            {isAuthenticated &&
              <Link to={`/userBlog/${user.nickname}`}>
                My Blogs
              </Link>
            }

            {!isAuthenticated &&
              <Link to={`/userBlog/null`}>
                My Blogs
              </Link>
            }
          </span>

          <span class="dropdown">
            <NotificationDropdown />
          </span>

        </div>

        <div>
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>

    );
  }

  function MobileWidthNav() {
    return (
      <div class="nav">
        <CreateUser />
        <div>

          <span class="dropdown">
            <Dropdown className="d-inline-block" onMouseOver={onMouseEnterBlogs} onMouseLeave={onMouseLeaveBlogs} isOpen={open} toggle={toggle}>
              <DropdownToggle tag="div" color="none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>
                  View Blogs
                </DropdownItem>
                <DropdownItem>
                  <div onClick={FeaturedBlogs}>
                    Featured Blogs
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div onClick={FollowedBlogs}>
                    Followed Blogs
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div onClick={RecentPosts}>
                    Recent Posts
                  </div>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem header>
                  My Page
                </DropdownItem>

                <DropdownItem>
                  <div onClick={UserBlog}>
                    My Blogs
                  </div>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem header>
                  Notifications
                </DropdownItem>

                <DropdownItem>
                  <div onClick={ViewNotifications}>
                    View Notifications
                  </div>
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </span>

          <span >
            <Link to='/'>
              Blog My Day
            </Link>
          </span>

        </div>

        <div>
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {width < 800 ? (
        <MobileWidthNav />
      ) : (
        <NormalWidthNav />
      )}
    </>

  );

}