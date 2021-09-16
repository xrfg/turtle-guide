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

const useStyles = makeStyles((theme) => ({
  card: { position: "relative", marginBottom: "1rem" },
  card__title: {},
  card__desc: {},
  forwardIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  sectionCover: {},
  onDrag: { backgroundColor: "green" },
  textField: { display: "block" },
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
    url,
    sectionCover: { url_thumb },
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

  const editSection = () => {
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
      <CardContent>
        {editing ? (
          <Box>
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
            {/* //! temporarly disabled */}
            {/* //? shall we make a edit options from here  */}
            {/* //? i.e. <TextEditor setText={setMediaText} content={content} />  */}

            {/* <TextField
              id="eventName"
              type="text"
              className={classes.textField}
              fullWidth
              defaultValue={description === "Description" ? null : description}
              placeholder="Description"
              multiline={true}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleDescription(e.target.value)}
            /> */}
          </Box>
        ) : (
          <Box>
            <Typography
              className={classes.card__title}
              variant="h6"
              component="h6"
            >
              {title} {id}
            </Typography>
            {url_thumb.length !== 0 ? (
              <img
                className={classes.sectionCover}
                alt="section-cover"
                src={url_thumb}
              />
            ) : null}

            {/* //! temporarly disabled */}
            {/* <Typography
              className={classes.card__desc}
              variant="subtitle1"
              component="p"
            >
              {description} */}
            <ReactQuill value={description} readOnly={true} theme={"bubble"} />
            {/* </Typography> */}
          </Box>
        )}
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonGroup
          orientation="horizontal"
          aria-label="horizontal button group"
        >
          {/* Save Edit  */}
          <EditSaveButton
            className={classes.hoverSaveEdit}
            editStatus={editing}
            editHandler={handleSaveEditBtn}
          />
          {/* Got to Edit section   */}
          <CustomIconButton
            href={`${url}`}
            onClickFunc={editSection}
            icon="forward"
          />
        </ButtonGroup>
        <ButtonGroup
          orientation="horizontal"
          aria-label="horizontal button group"
        >
          {/* // ! all the section is draggable, should only work when dragstart is this button */}
          {isIntro ? null : <CustomIconButton icon="drag" />}

          {/* Remove Section   */}
          <CustomIconButton onClickFunc={toggleDeleteDialogBox} icon="delete" />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
