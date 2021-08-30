/**
 * @desc Modal component created with MatUI Modal
 * takes props "content", "isOpen", "isClose"
 // * How to i.e.:
 * <ModalCustom content={a content} isOpen={state} isClose={function}/>
 */
import React, { useState, useEffect } from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
    },
    // * Modal CSS
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    mainContainer: {
      display: "flex",
    },
    btnSection: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    overview: {
      height: "fit-content",
    },
    input: {
      display: "none",
    },
    media: {
      height: 140,
    },
  })
);

const ModalCustom = (props) => {
  const classes = useStyles();

  // destru
  let { content, isOpen } = props;

  // States
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(isOpen);
    // eslint-disable-next-line
  }, [isOpen]);

  // * Modal CTRLs
  /**
   * @function handleClose
   * @desc handles the close state if the windows
   * is closed clicking out of the area
   */
  const handleClose = () => {
    // sends is Close state
    props.isClose(true);
    setOpenModal(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Insert Text</h2>
          <p id="transition-modal-description">{content}</p>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalCustom;
