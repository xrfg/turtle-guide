/**
 * @desc Navbar Component
 *
 */

import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./navbar.scss";

// Imports
import Menu from "../Menu/Menu";

const Navbar = ({ user }) => {
  const arrMenu = [
    { title: "", className: "dropdown-item", to: "/create-event" },
  ];

  return (
    <nav class="navbar">
      {/* LOGO Clickable */}
      <div className="navbar__container">
        <Link className="navbar-brand" to="/">
          Turtle Guide
        </Link>
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
