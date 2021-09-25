/**
 * @desc Component to create a PopupDialog box
 */

/* HOW TO

In the <Parent />:

create a state
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);


Create a function to handle toggle

  const toggleDeleteDialogBox = () => {
    setOpenDeleteDialogBox((prev) => !prev);
  };

esxample: The component's prop "confirm" fires a function into the <Parent />

const removeSection = (val) => {
    if (val) {
      props.sectionToDelete(id);
    }
    toggleDeleteDialogBox();
  };


component use example:

  <PopUpDialogBox
        open={openDeleteDialogBox}
        isClose={toggleDeleteDialogBox}
        confirm={removeSection}
        confirmButtonTitle="Delete Section"
        messageTitle={`Are you sure you want to delete the ${title} section?`}
        messageBody="Deleting a section will permanently erase it from the event."
      />

*/

import React from "react";
// * material UI imports Components
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

// MatUi Style Imports
import { makeStyles } from "@material-ui/core/styles";
import { ourColors, theme } from "../../styles/Theme";

import CustomButton from "../Buttons/CustomButtons/CustomButton";

const useStyles = makeStyles((theme) => ({
  modalBtn: {
    ...theme.buttons.modalbtn,
  },
  delBtn: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#F06569",
    },
  },
}));

const PopUpDialogBox = (props) => {
  const classes = useStyles();
  // destru
  const { open, confirmButtonTitle, messageTitle, messageBody } = props;

  /**
   * @function toggleMsg
   * @desc sets state to false to close up the modal
   */
  const toggleMsg = () => {
    // send close back to parent
    props.isClose(true);
    //     setOpenClose((prev) => !prev);
  };

  /**
   * @function onConfirm
   * @desc sends a confimation of the dialog
   * when the user CONFIRMS operation i.e. ok
   */
  const onConfirm = () => {
    props.confirm(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={toggleMsg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{messageTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messageBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <CustomButton onClickFunc={toggleMsg} autoFocus text="cancel" /> */}
          <Button
            onClick={toggleMsg}
            color="primary"
            autoFocus
            className={classes.modalBtn}
            /* style={{ backgroundColor: ourColors.lightGrey }} */
          >
            Cancel
          </Button>
          {/* <CustomButton onClickFunc={onConfirm} text={confirmButtonTitle} /> */}
          <Button
            onClick={onConfirm}
            color="primary"
            className={`${classes.modalBtn} ${classes.delBtn}`}
          >
            {confirmButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopUpDialogBox;
