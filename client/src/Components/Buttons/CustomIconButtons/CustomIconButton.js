import React from "react";

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
  btn: { ...theme.buttons.btn, margin: theme.spacing(1) },
}));

export default function CustomIconButton(props) {
  const classes = useStyles();

  const { icon, onClickFunc, color, size, href } = props;

  return (
    <IconButton
      className={classes.link}
      color={color}
      onClick={onClickFunc}
      href={href}
      size={size}
    >
      {
        // switch to render the icon from props
        {
          add: <Add />,
          save: <Save />,
          edit: <Edit />,
          forward: <Forward />,
          delete: <Delete />,
          drag: <DragIndicator />,
        }[icon]
      }
    </IconButton>
  );
}
