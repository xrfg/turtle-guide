/*
 * @desc Navbar Component
 *
 */

import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

// Imports
import Menu from "../Menu/Menu";

const Navbar = ({ user }) => {
  const arrMenu = [
    { title: "", className: "dropdown-item", to: "/create-event" },
  ];

  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      {/* LOGO Clickable */}
      <div className="container-fluid menu">
        <Link className="navbar-brand" to="/">
          Turtle Guide
        </Link>
        {/* MENU */}
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
