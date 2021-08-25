/**
 * @desc Single Menu Item for the Menu
 */

import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";

const MenuItemCustom = (props) => {
  /**
   * @desc PROPS: path, title (can a String or a Component)
   */

  const { path, title } = props;

  return (
    <Button
      aria-controls="{open ? 'menu-list-grow' : undefined}"
      aria-haspopup="true"
      component={Link}
      to={path}
    >
      {title}
    </Button>
  );
};

export default MenuItemCustom;
