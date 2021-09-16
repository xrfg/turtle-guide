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
import CustomIconButton from "../../Components/Buttons/CustomIconButtons/CustomIconButton";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 1.3rem",
    backgroundColor: "lightgray",
    borderRadius: "5px",
    border: "1px solid gray",
  },
}));

const EventName = (props) => {
  // * Hooks
  const classes = useStyles(props);

  // to use history.push(newRoute) on save
  let history = useHistory();

  // * States
  const [eventName, setEventName] = useState("");
  const [bgColor, setBgColor] = useState("inherit");

  // * Functions

  /**
   * @function onChange
   * @desc handles onchange
   */

  const onChange = (e) => {
    setEventName(e.target.value);
    setBgColor("#26b519");
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
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChange}
      />

      <CustomIconButton
        style={{ backgroundColor: bgColor }}
        type="submit"
        icon="save"
      />
    </form>
  );
};

export default EventName;
