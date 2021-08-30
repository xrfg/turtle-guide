/**
 * @desc Conmponent that creates a content block
 * into the blocks it can be edited and deleted
 * @param props item
 */

import React, { useState, useEffect, useCallback } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// * Mat UI
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";

// * Icons
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ShortTextIcon from "@material-ui/icons/ShortText";

// * Components
import TextEditor from "../Inputs/TextEditor";
// requires props "item" "isOpen" <ModalCuston content={} isOpen={state}/>
import ModalCustom from "../../Components/Modal/ModalCustom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
    },
    paper: {
      marginTop: "10px",
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
    mediaContainer: {
      textAlign: "center",
      justifyContent: "center",
    },
    mediaCaption: {
      textAlign: "center",
      justifyContent: "center",
    },
    img: {
      width: "100%",
    },
    iconsContainer: {
      marginLeft: "auto",
      marginRight: "20px",
    },
    descriptionContainer: {
      marginLeft: "20px",
    },
  })
);

const ContentBlockText = (props) => {
  const classes = useStyles();

  // * Destructuring props
  let { id, type, content } = props.item;
  // * State
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState({ content: "" });
  const [openModal, setOpenModal] = useState(false);

  // * Functions
  /**
   * @function removeContent
   * @desc sends back the selected element to be deleted
   * @param id
   */
  const removeContent = useCallback(
    (id) => {
      props.itemToDelete(id);
    },
    //eslint-disable-next-line
    [props.itemToDelete]
  );

  /**
   * @function sendNewContent
   * @desc sends back the selected element to be deleted
   * @param id
   */
  const sendNewContent = useCallback(
    () => {
      props.newContent(id, newContent);
    },
    //eslint-disable-next-line
    [props.newContent]
  );

  /**
   * @function editContent
   * @desc enables edit mode
   * @param id
   */
  const editContent = (id) => {
    // togle editing
    setIsEditing((prev) => !prev);
  };

  // to save if the caption is added/edited
  useEffect(() => {
    if (!isEditing && newContent.length !== 0) {
      // send mediacaptio and id to the parent
      // the function will pass it as a prop
      sendNewContent();
    }
    // eslint-disable-next-line
  }, [isEditing]);

  {
    /* // ! IMPORTANT - Make modals that opens with the editor */
  }

  /**
   * @function handleChange
   * @desc handles newContent state
   * @param e
   */
  const handleChange = (e) => {
    console.log(e.target.value);
    // set media caption obj
    setNewContent({ [e.target.name]: e.target.value });
  };

  console.log("newcontent", newContent);
  // * Modal CTRLs
  const handleOpen = () => {
    setOpenModal((prev) => !prev);
  };

  /**
   * @function doSomething
   * @desc checks the state isClosed and does something
   */
  const doSomething = (state) => {
    if (state) {
      setIsEditing(false);
      setOpenModal((prev) => !prev);
    }
    console.log("do some", state);
  };

  return (
    <Paper className={classes.paper} key={id}>
      <Grid item xs={12} sm container className={classes.mediaContainer}>
        <Grid item>
          <ShortTextIcon fontSize="large" />
        </Grid>
      </Grid>

      <Grid item xs={12} sm container className={classes.mediaCaption}>
        <Grid item className={classes.descriptionContainer}>
          <Typography gutterBottom variant="subtitle1">
            {/* // ! IMPORTANT - Make modals that opens with the editor */}
            {/* {type} id:{id} */}
            {isEditing ? (
              <div>
                <ModalCustom
                  content={<TextEditor content={content}></TextEditor>}
                  isOpen={true}
                  isClose={doSomething}
                />
                <html>{content}</html>
              </div>
            ) : (
              <html>{content}</html>
            )}
          </Typography>
        </Grid>
        <Grid item className={classes.iconsContainer}>
          {/*  // * editing title/description */}
          <ButtonBase onClick={() => editContent(id)}>
            {isEditing ? (
              <SaveIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )}
          </ButtonBase>
          {/* //* Sends the id to the parent */}
          <ButtonBase onClick={() => removeContent(id)}>
            <DeleteIcon fontSize="small" />
          </ButtonBase>
        </Grid>

        <Grid item>
          <Typography variant="subtitle1"></Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContentBlockText;
