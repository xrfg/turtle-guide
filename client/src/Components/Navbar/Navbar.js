import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

const Navbar = ({ user }) => {
  const history = useHistory();
  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Turtle Guide
        </Link>
      </div>
      <div className="container-fluid justify-content-sm-start justify-content-md-end justify-content-lg-end  ">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="/"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </Link>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/account">
                  Admin Page
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/current">
                  Current Events
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/create-event">
                  New Event
                </Link>
              </li>
            </ul>
          </li>
          <li
            className="nav-item"
            onClick={() => {
              localStorage.clear();
              history.push("/");
              console.log("user logged out");
              window.location.reload();
            }}
          >
            <Link className="nav-link active" /* aria-current="page" */ to="/">
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
