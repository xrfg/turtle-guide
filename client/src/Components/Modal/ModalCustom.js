/**
 * @desc Modal component created with MatUI Modal
 * takes props "content", "isOpen", "isClose"
 // * How to i.e.:
 * <ModalCustom content={a content} isOpen={state} isClose={function}/>
 */

// TODO create modal title
import React, { useState, useEffect } from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ourColors } from "../../styles/Theme";

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
    modalPaper: {
      width: "75vw",
      maxWidth: "750px",
      backgroundColor: ourColors.white,
      border: `1px solid ${ourColors.jet}`,
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4),
      paddingBottom: "4rem",
      position: "relative",
      overflow: "hidden",
    },
    modalTitle: { textAlign: "center" },
    modalDesc: {},

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
  let { content, isOpen, title } = props;

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
        <div className={classes.modalPaper}>
          <h2 className={classes.modalTitle} id="transition-modal-title">
            {title}
          </h2>
          <p className={classes.modalDesc} id="transition-modal-description">
            {content}
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalCustom;
