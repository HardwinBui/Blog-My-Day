import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Auth0 imports
import LoginButton from '../Auth0/loginButton';
import LogoutButton from '../Auth0/logoutButton';
//import UserProfile from './Auth0/userProfile';
import { useAuth0 } from "@auth0/auth0-react";

import './navbar.css';


// Here, we display our Navbar
export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

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
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
              <ul className="menu">
                <li className="menu-item">
                  <button onClick={handleMenuOne}>Menu 1</button>
                </li>
                <li className="menu-item">
                  <button onClick={handleMenuTwo}>Menu 2</button>
                </li>
              </ul>
            ) : null}
        </span>

        <span>


          <select>

            <option value="fruit">Fruit</option>

            <option value="vegetable">Vegetable</option>

            <option value="meat">Meat</option>

          </select>

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