import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Auth0 imports
import LoginButton from './Auth0/loginButton';
import LogoutButton from './Auth0/logoutButton';
//import UserProfile from './Auth0/userProfile';
import { useAuth0 } from "@auth0/auth0-react";

import '../App.css';

import { MDBNotification } from "mdbreact";

// Here, we display our Navbar
export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (

    <div class="nav">

      <div>
        <span class="title">

          Blog My Day
        </span>

        <span class="vl"></span>

        <span>
          <NavLink className="nav-link" to="/">
            View Blogs
          </NavLink>
        </span>

        <span>
          <NavLink className="nav-link" to="/userBlog">
            My Blogs
          </NavLink>
        </span>

        <span>
          <NavLink className="nav-link" to="/notification">
            Notifications
          </NavLink>
        </span>

       {/*  <MDBNotification
          //autohide={3000} // by default = ∞ ms
          bodyClassName="p-5 font-weight-bold white-text"
          className="stylish-color-dark"
          closeClassName="blue-grey-text"
          fade
          icon="bell"
          iconClassName="blue-grey-text"
          message="Hello, world! This is a toast message."
          show
          text="11 mins ago"
          title="Bootstrap"
          titleClassName="elegant-color-dark white-text"
        /> */}

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