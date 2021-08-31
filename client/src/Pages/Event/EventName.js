import React, { useState } from "react";

// * material UI imports Icons
import { TextField, Typography, makeStyles } from "@material-ui/core";
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

  // * States
  const [eventName, setEventName] = useState("");
  // true cause it starts with filling the name
  const [editing, setEditing] = useState(true);

  // * Functions

  // * submits the btn
  // ! maybe not necessary -> test!
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventName);
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
      props.getEventName(val);
      console.log("editing");
    } else {
      setEditing((prev) => !prev);
      console.log("editing closed", val);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      style={{ display: "flex" }}
    >
      {" "}
      {editing ? (
        <TextField
          disabled={editing ? false : true}
          id="eventName"
          type="text"
          defaultValue={eventName}
          placeholder="Name for the Event"
          helperText="This will be the public name of the Event"
          className={classes.nameInput}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEventName(e.target.value)}
        />
      ) : (
        <Typography className={classes.nameInput}>
          {eventName ? eventName : "Event Name"}
        </Typography>
      )}
      <EditSaveButton editStatus={editing} editHandler={handleSaveEditBtn} />
    </form>
  );
}
