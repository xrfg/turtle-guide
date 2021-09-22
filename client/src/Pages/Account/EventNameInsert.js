/**
 * @desc Component to insert the name of the event from <Account/>
 */

import React, { useState, useEffect } from "react";
import slugify from "react-slugify";

// * material UI imports Icons
import { TextField, makeStyles } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import CustomIconButton from "../../Components/Buttons/CustomIconButtons/CustomIconButton";

// * REDUX
import { useDispatch, useSelector } from "react-redux";

// * ACTIONS
import { eventCreate } from "../../store/actions/eventsActions";

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
  const dispatch = useDispatch();
  // to use history.push(newRoute) on save
  let history = useHistory();

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.userProfile);

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
   * @function createEvent
   * @param eventName coming from the props "getEventName"
   * @desc saves the event name and creates event obj
   */

  // if params === new then show name modal
  // else fetch event

  const createAndSendEvent = (obj) => {
    // destruct
    const { title, slug } = obj;

    return {
      title: title,
      nameIdentifier: slug, // function to make the slug
      slug: slug, // will be the same
      description: "description",
      sections: [
        // intro is added by default
        {
          type: "intro",
          id: 1,
          order: 1,
          url: "",
          slug: "intro",
          contents: [],
          title: eventName ? `${eventName} Introduction` : "Event Introduction",
          description: "Event Description",
          sectionCover: {
            filename: "",
            public_id: "",
            url: "",
            url_thumb: "",
          },
        },
      ],

      account: user._id,
    };
  };

  /**
   * @function goToAndSlugify
   * @param eventName
   * @desc redirects and creates an object to create the event
   */
  const goToAndSlugify = async (eventName) => {
    const createEvent = await createAndSendEvent({
      slug: slugify(eventName),
      title: eventName,
    });

    await dispatch(eventCreate({ event: createEvent, token: token }));

    history.push(`/admin/event/${slugify(eventName)}`, {
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
