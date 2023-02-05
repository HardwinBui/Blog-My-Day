import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
//import { NavLink } from "react-router-dom";

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


// Here, we display our Navbar
export default function Navigation() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggle = () => { }

  const onMouseEnter = () => {
    setOpen(true)
  }

  const onMouseLeave = () => {
    setOpen(false)
  }

  const FeaturedBlogs = () => {
    navigate("/");
    onMouseLeave();
  }

  const FollowedBlogs = () => {
    navigate("/followedBlog");
    onMouseLeave();
  }

  const RecentPosts = () => {
    navigate("/recentPosts");
    onMouseLeave();
  }

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
          <Dropdown className="d-inline-block" onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} isOpen={open} toggle={toggle}>
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
          <div class="logout-container">
            <h5 class="username">{user.nickname.toString()}</h5>
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>

  );
}