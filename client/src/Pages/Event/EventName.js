import React, { useState } from "react";

// * material UI imports Icons
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
// * material UI imports Icons
import { Save, Edit } from "@material-ui/icons";

// * React Components
import EditSaveButton from "../../Components/Buttons/EditSaveButton";

const useStyles = makeStyles((theme) => ({
  nameInput: { width: "24rem", margin: 8 },
  saveBtn: {
    height: "100%",
    alignSelf: "center",
  },
}));

export default function EventName(props) {
  const classes = useStyles(props);

  // * States
  const [eventName, setEventName] = useState("");
  const [editing, setEditing] = useState(false);

  // * Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventName);
  };

  // * goes into button child component and gets info back wether editing is toggled or not
  const handleSaveEditBtn = (val) => {
    if (val) {
      setEditing(true);
      console.log("editing");
    } else {
      setEditing(false);
      console.log("editing closed");
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
        <Typography className={classes.nameInput}>Van Gogh</Typography>
      )}
      <EditSaveButton editStatus={editing} editHandler={handleSaveEditBtn} />
    </form>
  );
}
