/**
 * @desc Component to create a PopupDialog box
 */

import React, { useState } from "react";
// * material UI imports Components
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

const PopUpDialogBox = (props) => {
  // destru
  const {
    open,
    onClose,
    onConfirm,
    confirmButtonTitle,
    messageTitle,
    messageBody,
  } = props;

  // * States
  const [openClose, setOpenClose] = useState(false);

  /**
   * @function toggleMsg
   * @desc sets state to false to close up the modal
   */
  const toggleMsg = () => {
    console.log("close");
    // send close back to parent
    props.isClose(true);
    //     setOpenClose((prev) => !prev);
  };

  /**
   * @function isClose
   * @desc closes the dialog box
   */

  return (
    <>
      <Dialog
        open={open}
        onClose={toggleMsg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete the EVENTNAME event?`}
          {messageTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messageBody}
            Deleting an event will permanently erase it from the admin's event
            collection. If you choose only to set it to private, check settings.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleMsg} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary">
            {confirmButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopUpDialogBox;
