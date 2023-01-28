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
          Featured Blogs
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

      </div>

      <div> 
        {isAuthenticated ? (
          <div>
            {user.email.toString() + "       "}
            <LogoutButton/>
          </div>
        ) : (
          <LoginButton/>
        )}
      </div>
    </div> 

  );
}