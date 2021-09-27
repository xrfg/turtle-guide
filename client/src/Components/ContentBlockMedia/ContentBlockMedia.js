/**
 * @desc Conmponent that creates a content block
 * into the blocks it can be edited and deleted
 * @param props item
 */

import React, { useState, useCallback } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// * Mat UI
import {
  ButtonGroup,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@material-ui/core";

// * Custom Components
import EditSaveButton from "../Buttons/EditSaveButton";
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
      marginBottom: "1rem",
      overflow: "hidden",
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
      /* padding: "1rem 2rem 2rem 2rem",
       textAlign: "center",
      justifyContent: "center", */
    },
    img: {
      width: "100%",
    },
    iconsContainer: {
      // marginLeft: "auto",
      display: "flex",
      justifyContent: "space-between",
    },
    descriptionContainer: {},
    imageTitle: { ...theme.admin.imgTitle },
    imageDesc: { ...theme.admin.imgDesc },
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
    title: caption.title === 0 ? "" : caption.title,
    description: caption.description === 0 ? "" : caption.description,
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
      (!isEditing && mediaCaption?.title.length !== 0) ||
      mediaCaption?.description?.length !== 0
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
    console.log("handleChange", [e.target.name], e.target.value);

    // set media caption obj
    setMediaCaption({ ...mediaCaption, [e.target.name]: e.target.value });
  };

  return (
    <Card
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
            <CustomIconButton icon="audio" disabled={true} />
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

      <CardContent className={classes.mediaCaption}>
        <Typography gutterBottom variant="subtitle1">
          {isEditing ? (
            <TextField
              id="standard-basic-title"
              label="Title"
              name="title"
              onChange={handleChange}
              value={mediaCaption.title}
              // inputProps={{ maxLength: 70 }}
            />
          ) : !isEditing && mediaCaption?.title.length !== 0 ? (
            <span className={classes?.imageTitle}>{mediaCaption?.title}</span>
          ) : caption?.title ? (
            <span className={classes.imageTitle}>{caption?.title}</span>
          ) : (
            <span className={classes.imageTitle}>Add a Title (optional)</span>
          )}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {isEditing ? (
            <TextField
              id="standard-basic-description"
              label="Description"
              name="description"
              maxRows="2"
              fullWidth
              onChange={handleChange}
              value={mediaCaption?.description}
              inputProps={{ maxLength: 500 }}
            />
          ) : !isEditing && mediaCaption?.description.length !== 0 ? (
            <span className={classes.imageDesc}>
              {mediaCaption?.description}
            </span>
          ) : caption?.description ? (
            <span className={classes.imageDesc}>{caption?.description}</span>
          ) : (
            <span className={classes.imageDesc}>
              Add a Description (optional)
            </span>
          )}
        </Typography>
      </CardContent>
      <CardActions className={classes.iconsContainer}>
        {/*  // * editing title/description */}
        <EditSaveButton
          editStatus={isEditing}
          editHandler={() => editContent(id)}
        />
        {/* <ButtonBase onClick={() => editContent(id)}>
            {isEditing ? (
              <SaveIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )}
          </ButtonBase> */}
        <ButtonGroup
          orientation="horizontal"
          aria-label="horizontal button group"
        >
          {props.isDraggable ? <CustomIconButton icon="drag" /> : null}
          {/* //* Sends the id to the parent */}
          <CustomIconButton
            icon="delete"
            onClickFunc={() => removeContent(id)}
          />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ContentBlockMedia;
