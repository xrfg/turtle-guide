/*
 * @desc Navbar Component
 *
 */

import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

// Imports
import Menu from "../Menu/Menu";

const Navbar = ({ user }) => {
  // decostruct
  // const {} = user

  //

  /*
   * @desc Menu array that will be rendered into <Menu/>
   * @this make it dynamic
   */

  // const arrMenu = [
  //   { title: "", className: "dropdown-item", to: "/create-event" },
  // ];

  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      {/* LOGO Clickable */}
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Turtle Guide
        </Link>
      </div>
      {/* MENU */}
      {/* <Menu menu={ }/> */}
    </nav>
  );
};

export default Navbar;
