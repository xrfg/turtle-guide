// TODO Add Drag and Rearrange BTN
// TODO Add Cover Photo -> Thumbnail taking from the section
// TODO Add Map image goes into specific MAP SECTION

// TODO Handle the Pay-wall
// TODO Handle the Feedback
// TODO Handle the Map

/**
 * @desc To map existing sections block
 */

import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import slugify from "react-slugify";

// * material UI imports Components
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
  ButtonGroup,
  TextField,
  Box,
  makeStyles,
} from "@material-ui/core";
// * material UI imports Icons

// * React Components
import EditSaveButton from "../../Components/Buttons/EditSaveButton";
import PopUpDialogBox from "../../Components/PopUpDialogBox/PopUpDialogBox";

// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

import CustomIconButton from "../../Components/Buttons/CustomIconButtons/CustomIconButton";

import { ourColors } from "../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  card: { marginBottom: "1rem" },
  cardTitleBox: { display: "flex", alignItems: "center" },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "black",
    display: "inline-block",
    zIndex: "5",
  },
  quillContainer: {
    position: "relative",
  },
  quillBg: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "8px",
    position: "absolute",
    zIndex: "15",
    height: "100%",
    width: "100%",
  },
  quillText: {
    padding: "0.1rem",
    color: "red",
    letterSpacing: "0.50000px",

    "& > div": {
      zIndex: "25", // ! otherwise it goes under
    },
  },

  cardDesc: {},
  cardContent: { position: "relative" },
  onDrag: { backgroundColor: "green" },
  textField: { display: "block", marginRight: "1rem", zIndex: "15" },
}));

export default function EventSection(props) {
  // * Hooks
  const classes = useStyles(props);

  // to use history.push(newRoute) on save
  let history = useHistory();

  // * Destructuring props
  let {
    id,
    order,
    title,
    description,
    sectionCover: { url },
  } = props.section;

  // * States
  const [editing, setEditing] = useState(false);
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);

  // ! to check if it is the intro section
  const isIntro = id === 1;

  // * Functions

  /**
   * @function handleSaveEditBtn
   * @param val boolean
   * @desc goes into button child component and gets info back wether editing is toggled or not
   *
   */

  const handleSaveEditBtn = (val) => {
    if (val) {
      // editing opens
      setEditing(true);
    } else {
      // editing closes
      setEditing(false);
      // fires section title saving
      props.saveSectionTitle();
    }
  };

  const removeSection = (val) => {
    // fired by <PopUpDialogBox /> if true deletes
    if (val) {
      props.sectionToDelete(id);
    }
    toggleDeleteDialogBox();
  };

  const handleTitle = (title) => {
    props.section.title = title;
  };
  const handleDescription = (description) => {
    props.section.description = description;
  };

  /**
   * @function editSection
   * @desc sends the edit mode of the ENTIRE section
   */

  const editSection = (e) => {
    props.editSection(id, title);
  };

  /**
   * @function toggleDeleteDialogBox
   * @desc handle the Delete DialogBox
   */

  const toggleDeleteDialogBox = () => {
    setOpenDeleteDialogBox((prev) => !prev);
  };

  return (
    <Card
      disableRipple={true}
      id={id}
      className={classes.card}
      key={id}
      // the attributes below are for the drag and drop function
      draggable={isIntro ? null : true}
      onDragOver={isIntro ? null : (e) => e.preventDefault()}
      onDragStart={isIntro ? null : props.handleDrag}
      onDrop={isIntro ? null : props.handleDrop}
    >
      <PopUpDialogBox
        open={openDeleteDialogBox}
        isClose={toggleDeleteDialogBox}
        confirm={removeSection}
        confirmButtonTitle="Delete Section"
        messageTitle={`Are you sure you want to delete the ${title} section?`}
        messageBody="Deleting a section will permanently erase it from the event."
      />

      <CardActionArea
        onClick={!editing ? editSection : null}
        // prevents it from going inside the section when editing
        // the title of the section
        disableRipple={true}
      >
        <CardContent className={classes.CardContent}>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              opacity: "0.5",
              zIndex: "0",
              top: 0,
              right: 0,
              background:
                url.length !== 0
                  ? `center / cover no-repeat url(${url})`
                  : "none",
            }}
          ></div>
          <Box className={classes.cardTitleBox}>
            {editing ? (
              <TextField
                id="eventName"
                type="text"
                className={classes.textField}
                defaultValue={title === "Title" ? null : title}
                placeholder="Title"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleTitle(e.target.value)}
              />
            ) : (
              <Typography className={classes.cardTitle}>{title}</Typography>
            )}
            <EditSaveButton
              className={classes.hoverSaveEdit}
              editStatus={editing}
              editHandler={handleSaveEditBtn}
            />
          </Box>

          <Box className={classes.quillContainer}>
            <div className={classes.quillBg}></div>
            <ReactQuill
              className={classes.quillText}
              /* style={{ zIndex: "25" }} */
              value={description}
              readOnly={true}
              theme={"bubble"}
            />
          </Box>
        </CardContent>
      </CardActionArea>

      {/* // ! all the section is draggable, should only work when dragstart is this button */}
      {isIntro ? null : (
        <CardActions
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: `1px solid ${ourColors.gainsboro}`,
          }}
        >
          <ButtonGroup
            orientation="horizontal"
            aria-label="horizontal button group"
          >
            <CustomIconButton icon="drag" />
            {/* Remove Section   */}
            <CustomIconButton
              onClickFunc={toggleDeleteDialogBox}
              icon="delete"
            />
          </ButtonGroup>
        </CardActions>
      )}
    </Card>
  );
}
