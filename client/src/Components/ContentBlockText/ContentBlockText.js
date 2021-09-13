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
import { DragIndicator } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ShortTextIcon from "@material-ui/icons/ShortText";

// * Components
import TextEditor from "../Inputs/TextEditor";
// requires props "item" "isOpen" <ModalCuston content={} isOpen={state}/>
import ModalCustom from "../../Components/Modal/ModalCustom";
// needed to render Rich text
import ReactQuill from "react-quill"; // ES6
import CustomIconButton from "../Buttons/CustomIconButtons/CustomIconButton";

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
      // ! hard coded just for purpose testing with drag nd drop
      // height: "200px",
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
      overflowWrap: "anywhere",
    },
    mediaCaption: {
      textAlign: "center",
      justifyContent: "center",
      overflowWrap: "anywhere",
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
      marginRight: "20px",
      overflowWrap: "anywhere",
    },
  })
);

const ContentBlockText = (props) => {
  const classes = useStyles();

  // * Destructuring props
  let { id, content } = props.item;

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

  /**
   * @desc activate drag
   *
   */

  return (
    <Paper
      className={classes.paper}
      key={id}
      // below attributes for drag nd drop
      id={id}
      draggable={props.isDraggable ? true : false}
      onDragOver={props.isDraggable ? (e) => e.preventDefault() : null}
      onDragStart={props.isDraggable ? props.handleDrag : null}
      onDrop={props.isDraggable ? props.handleDrop : null}
    >
      {/* <Grid item xs={12} sm container className={classes.mediaContainer}>
        <Grid item>
          <ShortTextIcon fontSize="large" />
        </Grid>
      </Grid> */}

      <Grid item xs={12} sm container className={classes.mediaCaption}>
        <Grid item>
          <Typography
            gutterBottom
            variant="subtitle1"
            // className={classes.descriptionContainer}
          >
            {isEditing ? (
              <div>
                <ModalCustom
                  content={
                    <TextEditor setText={setMediaText} content={content} />
                  }
                  isOpen={true}
                  isClose={closeEditingModal}
                />
                <html>{content}</html>
              </div>
            ) : (
              <ReactQuill
                value={content}
                readOnly={true}
                theme={"bubble"}
                // className={classes.descriptionContainer}
              />
            )}
          </Typography>
        </Grid>
        <Grid item className={classes.iconsContainer}>
          {/*  // * editing title/description */}
          <CustomIconButton
            icon={isEditing ? "save" : "edit"}
            onClickFunc={() => editContent(id)}
          />
          {/* //* Sends the id to the parent */}
          <CustomIconButton
            icon="delete"
            onClickFunc={() => removeContent(id)}
          />

          {props.isDraggable ? <CustomIconButton icon="drag" /> : null}
        </Grid>

        <Grid item>
          <Typography variant="subtitle1"></Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContentBlockText;
