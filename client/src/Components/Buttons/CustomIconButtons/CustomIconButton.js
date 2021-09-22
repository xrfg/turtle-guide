import React from "react";

// TODO Styles

// MatUi Component Imports
import { IconButton } from "@material-ui/core";

import { ourColors } from "../../../styles/Theme";

// MatUi Icon imports
import {
  Add,
  Save,
  Edit,
  Forward,
  Delete,
  DragIndicator,
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";

// MatUi Style Imports
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../styles/Theme"; // our CUSTOM theme
const myTheme = theme;

const useStyles = makeStyles((theme) => ({
  btnIcon: {
    ...theme.buttons.btnIcon,
    // margin: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  warning: {
    "&:hover": {
      color: "#F06569", // lightred
    },
  },
  forward: {
    "&:hover": {
      color: "#FFB833", // sunnyyellow
    },
  },
  edit: {
    "&:hover": {
      color: "#4698f0", // blue
    },
  },
  save: {
    color: "#f0f0f0", // grey
    "&:hover": {
      color: "white", // white
    },
  },
  add: {
    "&:hover": {
      color: "#FFB833", // sunnyyellow
    },
  },
  prev: {},
  drag: {
    color: "inherit", // grey
    "&:hover": {
      color: ourColors.jet, // white},
    },
  },
}));

export default function CustomIconButton(props) {
  const classes = useStyles();

  const { icon, onClickFunc, color, size, href, type, disabled, style } = props;

  return (
    <IconButton
      color={color}
      onClick={onClickFunc}
      href={href}
      size={size}
      type={type}
      disabled={disabled}
      disableRipple={icon === "drag" ? true : false}
      className={classes.btnIcon}
      style={style}
    >
      {
        // switch to render the icon from props
        {
          add: <Add className={classes.add} />,
          save: <Save className={classes.save} />,
          edit: <Edit className={classes.edit} />,
          forward: <Forward className={classes.forward} />,
          delete: <Delete className={classes.warning} />,
          drag: <DragIndicator className={classes.drag} />, // ! fix the chrome cursor
          prev: <NavigateBefore className={classes.prev} />,
          next: <NavigateNext />,
        }[icon]
      }
    </IconButton>
  );
}
