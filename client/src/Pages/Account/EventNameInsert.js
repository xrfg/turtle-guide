/**
 * @desc Component to insert the name of the event from <Account/>
 */

import React, { useState } from "react";
import slugify from "react-slugify";

// * material UI imports Icons
import { TextField, makeStyles, Button } from "@material-ui/core";
// * material UI imports Icons
import { Save } from "@material-ui/icons";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "1.4rem",

    backgroundColor: "lightgray",
    borderRadius: "5px",
    border: "1px solid gray",
  },
  nameInput: { marginRight: "1rem" },
  saveBtn: {
    height: "100%",
    alignSelf: "center",
  },
}));

const EventName = (props) => {
  const classes = useStyles(props);

  // * Hooks

  // to use history.push(newRoute) on save
  let history = useHistory();

  // * States
  const [eventName, setEventName] = useState("");

  // * Functions

  /**
   * @function onChange
   * @desc handles onchange
   */

  const onChange = (e) => {
    setEventName(e.target.value);
  };

  /**
   * @function goToAndSlugify
   * @param eventName
   * @desc redirects and creates an object to create the event
   */
  const goToAndSlugify = (eventName) => {
    history.push(`/admin/event/${slugify(eventName)}`, {
      isNew: true,
      slug: slugify(eventName),
      title: eventName,
    });
  };

  /**
   * @function createNewEvent
   * @desc creates a new event and redirects the user
   *       to the new event editing page
   *       while also sending a state with 3 keys (isNew, slug, title)
   */
  const createNewEvent = (e) => {
    e.preventDefault();
    goToAndSlugify(eventName);
  };

  return (
    <form className={classes.form} onSubmit={(e) => createNewEvent(e)}>
      <TextField
        id="eventName"
        type="text"
        required
        placeholder="Name for the Event"
        className={classes.nameInput}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
      />

      <Button className={classes.saveBtn} type="submit">
        <Save />
      </Button>
    </form>
  );
};

export default EventName;
