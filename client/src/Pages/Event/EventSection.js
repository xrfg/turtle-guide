// TODO Add Drag and Rearrange BTN
// TODO Add Cover Photo -> Thumbnail taking from the section
// TODO Add Map image goes into specific MAP SECTION

// TODO Handle the Pay-wall
// TODO Handle the Feedback
// TODO Handle the Map

import React, { useState } from "react";

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
import { Forward, Delete } from "@material-ui/icons";

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
  textField: { display: "block" },
}));
export default function EventSection(props) {
  const classes = useStyles(props);

  // * Destructuring props
  let { id, title, description, url } = props.section;

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

  return (
    <div>
      <Card className={classes.card} key={props.section.key}>
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
                defaultValue={
                  description === "Description" ? null : description
                }
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
              </Typography>{" "}
            </Box>
          )}
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ButtonGroup
            orientation="horizontal"
            aria-label="horizontal button group"
          >
            <EditSaveButton
              size={"small"}
              editStatus={editing}
              editHandler={handleSaveEditBtn}
            />
            <Button href={`${url}`} size="small">
              <Forward />
            </Button>
          </ButtonGroup>
          <Button size="small" onClick={() => removeSection(id)}>
            <Delete />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
