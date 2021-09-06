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
// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

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
   * @function editContent
   * @desc enables edit mode
   * @param id
   */
  const editContent = (id) => {
    // togle editing
    setIsEditing((prev) => !prev);
  };

  // * Modal CTRLs
  /**
   * @function closeEditingModal
   * @desc checks the state isClosed and does something
   */
  const closeEditingModal = (state) => {
    if (state) {
      setIsEditing(false);
      setOpenModal((prev) => !prev);
    }
  };

  /**
   * @function setMediaText
   * @desc sends back the updated text
   * @param contentToUpdate
   */
  const setMediaText = (contentToUpdate) => {
    // set the new content to props
    props.newContent(id, contentToUpdate);
    // set the local state
    setNewContent(contentToUpdate);
    // fires just the state that with useEffect will send the prop back
    setIsEditing((prev) => !prev);
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
            {isEditing ? (
              <div>
                <ModalCustom
                  content={
                    <TextEditor setText={setMediaText} content={content} />
                  }
                  // content={<TextEditor content={content}></TextEditor>}
                  isOpen={true}
                  isClose={closeEditingModal}
                />
                <html>{content}</html>
              </div>
            ) : (
              <ReactQuill value={content} readOnly={true} theme={"bubble"} />
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
