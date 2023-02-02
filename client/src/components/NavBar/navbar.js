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
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link } from "react-router-dom";


// Here, we display our Navbar
export default function Navigation() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = React.useState(false);
  
  const toggle = () => {
    /* this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    })); */
    console.log("test");
  }

  const onMouseEnter = () => {
    setOpen(true)
  }

  const onMouseLeave = () => {
    setOpen(false)
  }

  return (

    <div class="nav">

      <div>
        <span class="title">
          Blog My Day
        </span>

        <span class="vl"></span>

      {/*   <span>
          <NavLink className="nav-link" to="/">
            View Blogs
          </NavLink>
        </span>

        <span>
          <Dropdown className="d-inline-block" onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} isOpen={open} toggle={toggle}>
            <DropdownToggle tag="a" className="nav-link" caret color="primary">
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag="a" href="/" active>Featured Blogs</DropdownItem>
              
              <DropdownItem>Following</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
        </span> */}

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