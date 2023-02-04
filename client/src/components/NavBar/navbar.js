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
    navigate("/");
    onMouseLeave();
  }

  return (

    <div class="nav">
      <CreateUser />
      <div>
        <span class="title">
          Blog My Day
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

            </DropdownMenu>
          </Dropdown>
        </span>

        {isAuthenticated &&
          <span class="navopt">
            <Link to={`/userBlog/${user.nickname}`}>
              My Blogs
            </Link>
          </span>
        }

        <span class="navopt">
          <Link to="/notification">
            Notifications
          </Link>
        </span>

      </div>

      <div>
        {isAuthenticated ? (
          <div>
            {user.nickname.toString() + "       "}
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>

  );
}