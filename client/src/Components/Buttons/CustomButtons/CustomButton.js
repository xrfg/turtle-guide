import React from "react";

// TODO Implement throughout the Admin
// TODO Make ButtonGroups like in Material UI???
// TODO Styles

// MatUi Component Imports
import { Button } from "@material-ui/core";

// MatUi Icon imports
import {
  Add,
  Save,
  Edit,
  Forward,
  Delete,
  DragIndicator,
  ArrowBack,
} from "@material-ui/icons";

// MatUi Style Imports
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../styles/Theme"; // our CUSTOM theme
const myTheme = theme;

const useStyles = makeStyles((theme) => ({
  btn: { ...theme.buttons.btn, margin: theme.spacing(1) },
}));

export default function CustomButton(props) {
  const classes = useStyles();

  const {
    text,
    startIcon,
    endIcon,
    variant,
    href,
    color,
    onClickFunc,
    type,
    disabled,
    autoFocus,
  } = props;

  return (
    <Button
      startIcon={
        {
          add: <Add />,
          save: <Save />,
          edit: <Edit />,
          forward: <Forward />,
          delete: <Delete />,
          drag: <DragIndicator />,
          arrowBack: <ArrowBack />,
        }[startIcon]
      }
      endIcon={
        {
          add: <Add />,
          save: <Save />,
          edit: <Edit />,
          forward: <Forward />,
          delete: <Delete />,
          drag: <DragIndicator />,
          arrowBack: <ArrowBack />,
        }[endIcon]
      }
      variant={variant}
      href={href}
      color={color}
      onClick={onClickFunc}
      type={type}
      disabled={disabled}
      className={classes.btn}
      autoFocus={autoFocus ? true : false}
    >
      {text}
    </Button>
  );
}
