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
import UndoIcon from "@material-ui/icons/Undo";

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

const ContentBlockMedia = (props) => {
  const classes = useStyles();

  // * Destructuring props
  let {
    id,
    type,
    content: { url, url_thumb, original_filename, caption },
  } = props.item;

  // * State
  const [isEditing, setIsEditing] = useState(false);
  const [mediaCaption, setMediaCaption] = useState({
    title: "",
    description: "",
  });

  // * Functions
  /**
   * @function removeContent
   * @desc sends back the selected element to be deleted
   * @param id it takes it from the component
   */
  const removeContent = useCallback(
    () => {
      props.itemToDelete(id);
    },
    //eslint-disable-next-line
    [props.itemToDelete]
  );

  /**
   * @function sendMediaCaption
   * @desc sends back the selected element to be deleted
   * @param id it takes it from the component
   */
  const sendMediaCaption = () => {
    props.mediaCaption(id, mediaCaption);
  };

  /**
   * @function editContent
   * @desc enables edit mode
   * @param id it takes it from the component
   */
  const editContent = () => {
    // togle editing
    setIsEditing((prev) => !prev);
    // to save if the caption is added/edited
    if (
      (!isEditing && mediaCaption.title.length !== 0) ||
      mediaCaption.description.length !== 0
    ) {
      // send mediacaptio and id to the parent
      // the function will pass it as a prop
      sendMediaCaption();
    }
  };

  /**
   * @function handleChange
   * @desc handles mediacaption state
   * @param e
   */
  const handleChange = (e) => {
    // set media caption obj
    setMediaCaption({ ...mediaCaption, [e.target.name]: e.target.value });
  };

  return (
    <Paper
      className={classes.paper}
      key={id}
      // below attributes for drag nd drop
      id={id}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={props.handleDrag}
      onDrop={props.handleDrop}
    >
      <Grid item xs={12} sm container className={classes.mediaContainer}>
        <Grid item>
          {/* <ButtonBase className={classes.image}> */}
          {/* // * Sets icon if the file is audio */}
          {type === "audio" ? (
            <PlayCircleOutlineIcon fontSize="large" />
          ) : type === "video" ? (
            <img
              className={classes.img}
              alt={original_filename}
              src={url_thumb}
            />
          ) : (
            <img className={classes.img} alt={original_filename} src={url} />
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} sm container className={classes.mediaCaption}>
        <Grid item className={classes.descriptionContainer}>
          <Typography gutterBottom variant="subtitle1">
            {isEditing ? (
              <TextField
                id="standard-basic-title"
                label="Title"
                name="title"
                onChange={handleChange}
                value={caption?.title || mediaCaption.title}
              />
            ) : !isEditing && mediaCaption.title.length !== 0 ? (
              <h5>{caption?.title || mediaCaption.title}</h5>
            ) : caption?.title ? (
              <h5>{caption?.title}</h5>
            ) : (
              <h5>Add a Title (optional)</h5>
            )}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {isEditing ? (
              <TextField
                id="standard-basic-description"
                label="Description"
                name="description"
                onChange={handleChange}
                value={caption?.description || mediaCaption.description}
              />
            ) : !isEditing && mediaCaption.description.length !== 0 ? (
              <h6>{caption?.description || mediaCaption.description}</h6>
            ) : caption?.description ? (
              <h6>{caption?.description}</h6>
            ) : (
              <h6>Add a Description (optional)</h6>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary"></Typography>
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

export default ContentBlockMedia;
