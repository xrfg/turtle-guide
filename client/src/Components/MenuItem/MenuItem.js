/*
 * @desc Single Menu Item for the Menu
 * @desc
 */

import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

const MenuItemCustom = (props) => {
  /*
   * @desc PROPS: onClick (default: null), title (can a String or a Component)
   *
   */

  const { onClick = () => {}, title } = props;

  return <MenuItem onClick={onClick}>{title}</MenuItem>;
};

export default MenuItemCustom;
