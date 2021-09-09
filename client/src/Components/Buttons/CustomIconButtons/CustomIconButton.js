import React from "react";

// TODO Styles

// MatUi Component Imports
import { IconButton } from "@material-ui/core";

// MatUi Icon imports
import {
  Add,
  Save,
  Edit,
  Forward,
  Delete,
  DragIndicator,
} from "@material-ui/icons";

// MatUi Style Imports
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../styles/Theme"; // our CUSTOM theme
const myTheme = theme;

const useStyles = makeStyles((theme) => ({
  btnIcon: { ...theme.buttons.btnIcon, margin: theme.spacing(1) },
}));

export default function CustomIconButton(props) {
  const classes = useStyles();

  const { icon, onClickFunc, color, size, href, type, disabled } = props;

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
    >
      {
        // switch to render the icon from props
        {
          add: <Add />,
          save: <Save />,
          edit: <Edit />,
          forward: <Forward />,
          delete: <Delete />,
          drag: <DragIndicator />, // ! fix the chrome cursor
        }[icon]
      }
    </IconButton>
  );
}
