/**
 * @desc Components that returns an input for the event name
 */

// * react imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// * material UI imports Icons
import { TextField, Typography, makeStyles, Box } from "@material-ui/core";
// * material UI imports Icons

// * React Components
import EditSaveButton from "../../Components/Buttons/EditSaveButton";

// * our colors
import { ourColors, ourColorsTwo } from "../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  eventNameContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    ...theme.admin.pageTitleContainer,
  },
  nameInput: { marginRight: "1rem" },
  pageTitle: { ...theme.admin.pageTitle, marginBottom: "0" },
  saveBtn: {
    height: "100%",
    alignSelf: "center",
  },
}));

// TODO insert a modal that opens the event naming if the event does not exists

const EventName = (props) => {
  // decostru
  const { title, slug } = props;

  // HOOKS
  const classes = useStyles(props);
  let history = useHistory();

  // * gives the path we're on -> using it to deal with redirect in the Account page
  const pathName = window.location.pathname;

  // * States
  const [eventName, setEventName] = useState(title);
  // true cause it starts with filling the name
  const [editing, setEditing] = useState(false);

  // * Functions

  /**
   * @function onChange
   * @desc handles onchange
   */

  const onChange = (e) => {
    setEventName(e.target.value);
  };

  /**
   * @function handleSaveEditBtn
   * @param val boolean
   * @desc goes into button child component and gets info back wether editing is toggled or not
   *
   */
  const handleSaveEditBtn = (val) => {
    if (val) {
      setEditing((prev) => !prev);
    } else {
      // save edit
      setEditing((prev) => !prev);
      // important to fire the event name update
      props.eventNameUpdate(eventName);
    }
  };

  return (
    <Box className={classes.eventNameContainer}>
      {editing ? (
        <TextField
          disabled={editing ? false : true}
          id="eventName"
          type="text"
          fullWidth
          required
          defaultValue={eventName}
          placeholder="Name for the Event"
          helperText="This will be the public name of the Event"
          className={classes.nameInput}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
          color="secondary"
        />
      ) : (
        <Typography
          /* component="h2"
          variant="h2" */
          className={`${classes.nameInput} ${classes.pageTitle}`}
        >
          {eventName ? eventName : "Event Name"}
        </Typography>
      )}
      <EditSaveButton
        isEventTitle={true}
        editStatus={editing}
        editHandler={handleSaveEditBtn}
      />
      {/* <Typography className={classes.nameInput}>
        The address of your event is: /{slug}
      </Typography> */}
    </Box>
  );
};

export default EventName;
