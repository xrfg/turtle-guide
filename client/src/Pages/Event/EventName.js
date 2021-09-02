import React, { useState } from "react";

// * material UI imports Icons
import { TextField, Typography, makeStyles, Box } from "@material-ui/core";
// * material UI imports Icons

// * React Components
import EditSaveButton from "../../Components/Buttons/EditSaveButton";

const useStyles = makeStyles((theme) => ({
  nameInput: { width: "24rem", margin: 8 },
  saveBtn: {
    height: "100%",
    alignSelf: "center",
  },
}));

// TODO insert a modal that opens the event naming if the event does not exists

export default function EventName(props) {
  const classes = useStyles(props);

  // * gives the path we're on -> using it to deal with redirect in the Account page
  const pathName = window.location.pathname;

  // * States
  const [eventName, setEventName] = useState("");
  // true cause it starts with filling the name
  const [editing, setEditing] = useState(true);

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
      props.getEventName(eventName);
      // if we are on the account page, auto redirect to the newly created event
      // otherwise we are inside of the event page already and just updating the current name
      pathName === "/account"
        ? // ! should we create a func to make a automatic slug here(on this component)?
          window.location.replace(`/${eventName}`)
        : setEditing((prev) => !prev);
    }
  };

  return (
    <Box>
      {editing ? (
        <TextField
          disabled={editing ? false : true}
          id="eventName"
          type="text"
          required
          defaultValue={eventName}
          placeholder="Name for the Event"
          helperText="This will be the public name of the Event"
          className={classes.nameInput}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
        />
      ) : (
        <Typography className={classes.nameInput}>
          {eventName ? eventName : "Event Name"}
        </Typography>
      )}
      <EditSaveButton editStatus={editing} editHandler={handleSaveEditBtn} />
    </Box>
  );
}
