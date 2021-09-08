/**
 * @desc Navbar Component
 *
 */

import React from "react";

// * react-router-dom Imports
import { Link } from "react-router-dom";

// * Material UI Imports
import { AppBar, Toolbar } from "@material-ui/core";

import logo from "../../assets/images/logo/turtleguidelogo.png";

// * Component Imports
import Menu from "../Menu/Menu";

const Navbar = () => {
  return (
    <AppBar style={{ backgroundColor: "#D9D9D9" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Link className="navbar-brand" to="/">
          <img
            style={{ height: "60px", margin: "0.4rem 0" }}
            src={logo}
            alt="logo"
          />
        </Link>

        {/* has the YOUR ACCOUNT and LOG IN/OUT */}
        <Menu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
