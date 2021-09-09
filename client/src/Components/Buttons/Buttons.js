import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//mui icons
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";

// our theme
import { theme } from "../../styles/Theme";

//in order to use buttons import them to the required file
//import { AddButton,BackButton, DeleteButton, DragButton, SaveButton, SendButton } from "./Components/Buttons/AddButton";

const myTheme = theme;

const ColorButton = withStyles((theme) => ({
  root: {
    color: myTheme.palette.text.primary,
    backgroundColor: myTheme.palette.secondary.main,
    "&:hover": {
      backgroundColor: myTheme.palette.text.darkGrey,
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  btn: { ...theme.buttons.btn, margin: theme.spacing(1) },
}));

export function SaveButton() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton
        endIcon={<SaveOutlinedIcon style={{ fontSize: "18" }} />}
        variant="contained"
        className={classes.btn}
      >
        save
      </ColorButton>
    </div>
  );
}

export function DeleteButton() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton
        endIcon={<DeleteIcon style={{ fontSize: "18" }} />}
        variant="contained"
        className={classes.btn}
      >
        Delete
      </ColorButton>
    </div>
  );
}

export function AddButton() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton
        endIcon={<AddOutlinedIcon style={{ fontSize: "18" }} />}
        variant="contained"
        className={classes.btn}
      >
        add
      </ColorButton>
    </div>
  );
}

export function BackButton() {
  const classes = useStyles();
  return (
    <div>
      <ColorButton
        startIcon={<ArrowBackOutlinedIcon style={{ fontSize: "18" }} />}
        variant="contained"
        className={classes.btn}
      >
        go back
      </ColorButton>
    </div>
  );
}
export function SendButton() {
  const classes = useStyles();
  return (
    <div>
      <ColorButton
        endIcon={<SendIcon style={{ fontSize: "18" }} />}
        variant="contained"
        className={classes.btn}
      >
        send
      </ColorButton>
    </div>
  );
}

export function DragButton() {
  const classes = useStyles();
  return (
    <div>
      <ColorButton
        startIcon={<DragIndicatorIcon style={{ fontSize: "25" }} />}
        variant="contained"
        className={classes.btn}
      ></ColorButton>
    </div>
  );
}
export function EditButton() {
  const classes = useStyles();
  return (
    <div>
      <ColorButton
        endIcon={<EditIcon style={{ fontSize: "18" }} />}
        variant="contained"
        className={classes.btn}
      >
        edit
      </ColorButton>
    </div>
  );
}
