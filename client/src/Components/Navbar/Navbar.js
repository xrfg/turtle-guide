/**
 * @desc Navbar Component
 *
 */

import React from "react";

// * react-router-dom Imports
import { Link } from "react-router-dom";

// * Material UI Imports
import { AppBar, Toolbar } from "@material-ui/core";

import logoOutlines from "../../assets/images/logo/turtle_logo-outlines.png";
import logoFilled from "../../assets/images/logo/turtle_logo-filled.png";

// * Component Imports
import Menu from "../Menu/Menu";
import { ourColors } from "../../styles/Theme";

const Navbar = () => {
  return (
    <AppBar
      style={{ backgroundColor: ourColors.lightGrey, position: "relative" }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Link className="navbar-brand" to="/">
          <img
            style={{ height: "60px", margin: "0.4rem 0" }}
            src={logoFilled}
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
