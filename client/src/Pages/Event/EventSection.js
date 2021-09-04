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
  Button,
  ButtonGroup,
  TextField,
  Box,
  makeStyles,
} from "@material-ui/core";
// * material UI imports Icons
import { Forward, Delete, DragIndicator } from "@material-ui/icons";

// * React Components
import EditSaveButton from "../../Components/Buttons/EditSaveButton";

const useStyles = makeStyles((theme) => ({
  card: { position: "relative", marginBottom: "1rem" },
  card__title: {},
  card__desc: {},
  forwardIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  onDrag: { backgroundColor: "green" },
  textField: { display: "block" },
}));
export default function EventSection(props) {
  // * Hooks
  const classes = useStyles(props);

  // to use history.push(newRoute) on save
  let history = useHistory();

  // * Destructuring props
  let { id, order, title, description, url } = props.section;

  // * States
  const [editing, setEditing] = useState(false);

  // * Functions

  /**
   * @function handleSaveEditBtn
   * @param val boolean
   * @desc goes into button child component and gets info back wether editing is toggled or not
   *
   */

  const handleSaveEditBtn = (val) => {
    if (val) {
      setEditing(true);
      console.log("editing");
    } else {
      setEditing(false);
      console.log("editing closed");
    }
  };

  const removeSection = (id) => {
    props.sectionToDelete(id);
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
    props.editSection(id);
  };

  /**
   * @function goToAndSlugify
   * @param eventName
   * @desc redirects and creates an object to create the event
   */
  const goToAndSlugify = (eventName) => {
    history.push(`/admin/event/${slugify(eventName)}`, {
      // isNew: true,
      slug: slugify(eventName),
      title: title,
    });
  };

  return (
    <Card
      id={id}
      className={classes.card}
      key={id}
      // the attributes below are for the drag and drop function
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={props.handleDrag}
      onDrop={props.handleDrop}
    >
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
            <TextField
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
            />
          </Box>
        ) : (
          <Box>
            <Typography
              className={classes.card__title}
              variant="h6"
              component="h6"
            >
              {title}
            </Typography>
            <Typography
              className={classes.card__desc}
              variant="subtitle1"
              component="p"
            >
              {description}
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonGroup
          orientation="horizontal"
          aria-label="horizontal button group"
        >
          <EditSaveButton
            size={"small"}
            editStatus={editing}
            editHandler={handleSaveEditBtn}
          />
          <Button href={`${url}`} size="small" onClick={editSection}>
            <Forward />
          </Button>
        </ButtonGroup>
        <ButtonGroup
          orientation="horizontal"
          aria-label="horizontal button group"
        >
          <Button style={{ cursor: "grab" }} size="small">
            <DragIndicator />
          </Button>{" "}
          <Button size="small" onClick={() => removeSection(id)}>
            <Delete />
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
