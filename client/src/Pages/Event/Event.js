/**
 * @desc Event Page at route /admin/event/:slug either for creating a new event or editing an existing one
 */

// TODO Fix Section Rendering after having changed the IDS of the sections from 2 onwards. since 1 is Intro,, there is also type="intro" and type="section"

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

// * Imports
import slugify from "react-slugify";
import { toast } from "react-toastify";

// * REDUX
import { useSelector, useDispatch } from "react-redux";

// * ACTIONS
import {
  eventCreate,
  eventUpdate,
  eventDelete,
} from "../../store/actions/eventsActions";

// * Components Imports (children)
import EventSection from "./EventSection";
import EventName from "./EventName";
import PopUpDialogBox from "../../Components/PopUpDialogBox/PopUpDialogBox";

// * Functions
import { goBackToPage, unBlock } from "../../functions/functions";

//* css style sheet
import "./event.css";

// * material UI imports Components
import {
  Container,
  Grid,
  CardContent,
  Typography,
  Box,
  Button,
  ButtonGroup,
  makeStyles,
} from "@material-ui/core";

// * material UI imports Icons
import { Add } from "@material-ui/icons";
import CustomButton from "../../Components/Buttons/CustomButtons/CustomButton";
import CustomIconButton from "../../Components/Buttons/CustomIconButtons/CustomIconButton";

const useStyles = makeStyles((theme) => ({
  page: {
    ...theme.admin.page,
  },
  container: { ...theme.admin.container }, // main Admin container class
  gridContentHeader: { ...theme.admin.gridContentHeader },
  eventHeaderTab: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventBtnGrp: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "space-around",
  },
  saveDelBtnGrp: {
    // backgroundColor: "red",
    width: "100%",
    justifySelf: "start",
  },
  btnSidebar: { ...theme.admin.btnSidebar },
  btnGroup: { ...theme.admin.btnGroup },
  sectionsContainer: { ...theme.admin.sectionsContentsContainer },
}));

// TODO goBack prevention
// TODO goBack Button
// ! takes event slug
export default function Event(props) {
  // * Hooks
  const classes = useStyles(props);
  const dispatch = useDispatch();

  // to use history.push(newRoute) on save
  let history = useHistory();

  // * States
  // single event
  const [event, setEvent] = useState();

  // all sections
  // the sections are always upadated here before the save
  const [sections, setSections] = useState([]);
  // for saving
  const [needsToSave, setNeedsToSave] = useState(false);

  // for the "Delete Event" modal handlers
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);

  // for the drag and drop sections re-ordering
  const [dragId, setDragId] = useState();

  // * Refs
  // just to skip the first and second render
  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);

  // * Hooks
  // loads event from reducer
  const events = useSelector((state) => state.events.events);
  const token = useSelector((state) => state.user.token);

  // get the slug to search for the event
  const slug = props.match.params.name;
  // to allow if is a new event
  // props comming from account

  // to allow if is a new event
  // props comming from account
  let isNewEvent = props.location.state?.isNew === true ? true : false;

  // * LifeCycles -> UseEffect

  useEffect(() => {
    // create a new event
    if (isNewEvent) {
      const obj = props.location.state;
      return createAndSendEvent(obj);
    }

    // search for the event into redux
    const getEvent = events.find((x) => x.slug === slug);
    // set the whole event
    setEvent(getEvent);

    // set the sections state for mapping
    setSections(getEvent.sections);

    //eslint-disable-next-line
  }, []);

  // fires when the state event is created/ updated
  useEffect(() => {
    // TODO try catch to handle UI Error

    async function saveData() {
      if (needsToSave) {
        // dispatch
        await dispatch(eventUpdate({ event: event, token: token }));

        toast.success("Saved successfully!");
        return setNeedsToSave(false);
      }
    }
    saveData();

    // if event is empty do not dispatch
    // ! isNewevent Stops it from a recreating of an existing event
    // ! keep as an option
    if (!event || !isNewEvent || needsToSave) {
      return null;
    }

    // dispatch the event to redux
    return dispatch(eventCreate({ event: event, token: token }));
    //eslint-disable-next-line
  }, [event]);

  // handles the save button
  useEffect(() => {
    // if true skips the first render
    if (firstUpdate.current) {
      return (firstUpdate.current = false);
    }
    // in case the event is new can be saved on second render
    if (!firstUpdate.current && isNewEvent) {
      return setNeedsToSave(true);
    }
    // if true skips the second render
    if (secondUpdate.current) {
      return (secondUpdate.current = false);
    }

    // do things after first render
    return setNeedsToSave(true);

    //eslint-disable-next-line
  }, [sections]);

  // * Functions

  /**
   * @function addIntro
   * @desc makes an unique obj INTRO with id:1, order:1
   * all the other sections will start from id:2 and order:2
   * so that intro is always first in the array
   */

  /* const addIntro = () => {
    console.log(sections);
    if (sections.length === 0 || !sections[0].id === 1) {
      const intro = {
        type: "intro",
        id: 1,
        order: 1,
        url: "",
        slug: "title",
        contents: [],
        title: `${event.title} Introduction`,
        description: "Description",
        sectionCover: {
          filename: "",
          public_id: "",
          url: "",
          url_thumb: "",
        },
      };

      setSections([intro, ...sections]);
      console.log([intro, ...sections]);
    } else {
      setIsError("Already have an Intro!");
      setTimeout(() => {
        setIsError(false);
      }, 4000);
      console.log("ALREADY HAVE INTRO!");
    }
  }; */

  /**
   * @function findBiggestId
   * @desc returns a Number -> biggest existing integer of an "id" from the sections array
   * is aiding the assigning of id's to new sections in function addToContents
   */

  const findBiggestId = (e) => {
    // * starts from 2 so that it accounts for Intro
    let biggestId = 2;
    sections.forEach((section) => {
      if (section.id > biggestId) {
        biggestId = section.id;
      }
    });
    return biggestId;
  };

  /**
   * @function addToContents
   * @desc adds a content into the state "contents" that will be mapped
   */

  const addToContents = () => {
    const newSectionsArr = [
      {
        type: "section",
        id: 0,
        order: 0,
        url: "",
        slug: "title",
        contents: [],
        title: "Title",
        description: "Description",
        sectionCover: {
          filename: "",
          public_id: "",
          url: "",
          url_thumb: "",
        },
      },
    ];
    // add ids
    // create "id" based on the contents already into the array,
    // from the biggestId present on
    // if [contents] s empty assigns the index

    const bigId = findBiggestId();
    console.log("findBiggestId()", findBiggestId());

    // const bigId = sections

    newSectionsArr.forEach((section, i) => {
      if (sections.length === 0) {
        // * starts from 2 so that it accounts for Intro
        section["id"] = 2;
        section["order"] = 2;
      } else if (sections.length === 1 && sections[0].type === "intro") {
        section["id"] = 2;
        section["order"] = 2;
      } else {
        // find the section with the biggest id
        // if (sections[0].id === 1)
        const lastSection = sections.find((section) => section.id === bigId);

        section["id"] = lastSection.id + i + 1;
        section["order"] = sections[sections.length - 1].order + i + 1;
      }
    });

    setSections([...sections, ...newSectionsArr]);
    console.log([...sections, ...newSectionsArr]);
  };

  /**
   * @function deleteSection
   * @param id sent from the <Child />
   * @desc returns the section to delete from the sections Arr
   */
  const deleteSection = (id) => {
    // IMPORTANT
    //  filter returns an array so updates the sections
    const newSections = sections.filter((section) => section.id !== id);
    // set new sections
    setSections(newSections);
    toast.warn("Section deleted!");
  };

  // * ----------- Functions to handle the "Delete Event" Modal

  /**
   * @function toggleDeleteDialogBox
   * @desc handle the Delete DialogBox
   */

  const toggleDeleteDialogBox = () => {
    setOpenDeleteDialogBox((prev) => !prev);
  };

  /**
   * @function deleteEvent
   * @desc deletes the current event from mongo
   */
  const deleteEvent = (val) => {
    const objToSend = {
      nameIdentifier: event.nameIdentifier,
      token: token,
    };
    if (val) {
      dispatch(eventDelete(objToSend));
      history.goBack();
    }

    toggleDeleteDialogBox();
  };

  // * ----------- Functions for the Drag and Re-order of <EventSection/>s

  /**
   * @function handleDrag
   * @desc gets the id of the Section which is being dragged
   * * is passed into the <Child />
   */

  const handleDrag = (e) => {
    // IMPORTANT
    // e.currentTarget.id needs to be parsed otherwise later in handleDrop FUNC, "===" will not work since types are Num and String -> after parsing will be: Num === Num
    setDragId(parseInt(e.currentTarget.id));
  };

  /**
   * @function handleDrop
   * @desc handles the drop and drag function, using section's keys "id" and "order", which by default are the same once the section is created
   * * * is passed into the <Child />
   */

  const handleDrop = (e) => {
    // * Finding the drag section with the same id as the one the user is trying to drag from
    const dragSection = sections.find((section) => {
      return section.id === dragId;
    });

    // * Finding the drop section with the same id as the one the user is trying to drop at
    const dropSection = sections.find(
      // parsing again because section.id is a Num and e.currentTarget.id is a String
      (section) => section.id === parseInt(e.currentTarget.id)
    );

    // from order x to order y, from one place to another
    const dragSectionOrder = dragSection.order;
    const dropSectionOrder = dropSection.order;

    // setting a new state with the updated order
    const newSectionState = sections.map((section) => {
      if (section.id === dragId) {
        section.order = dropSectionOrder;
      }
      if (section.id === parseInt(e.currentTarget.id)) {
        section.order = dragSectionOrder;
      }
      return section;
    });

    setSections(newSectionState);
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

    setEvent({
      title: title,
      nameIdentifier: slug, // function to make the slug
      slug: slug, // will be the same
      description: "description", // ? is to do?
      sections: [
        // intro is added by default
        {
          type: "intro",
          id: 1,
          order: 1,
          url: "",
          slug: "intro",
          contents: [],
          title: event ? `${event.title} Introduction` : "Event Introduction",
          description: "Event Description",
          sectionCover: {
            filename: "",
            public_id: "",
            url: "",
            url_thumb: "",
          },
        },
      ],
      // TODO CHANGE ACCOUNT
      // WILL BET SENT ONCe IS LOGGED IN
      account: "611e5aca56104a1c09f9d13e",
      // ! spread obj
    });
    // to stop useEffect after the creation of a new event
    // ! remove
    isNewEvent = false;
  };

  /**
   * @function saveEvent
   * @desc saves the event
   */

  const saveEvent = (obj) => {
    // set to true or stops it in use effect
    setNeedsToSave(true);
    // if the event is new skips it
    if (isNewEvent) {
      return;
    }
    // update event

    // destruc
    // if no new title provided (can come just if event name is changed)
    // uses the event one
    const { title = event.title } = obj;
    // new slug
    const slug = slugify(title);
    // push new data into event
    setEvent({
      ...event,
      title: title,
      slug: slug,
      nameIdentifier: slug, // new name identifier
      oldNameIdentifier: event.slug, // old name identifier just for the search
      sections: [...sections],
    });
    // setNeedsToSave(false) is into useEffect
  };

  /**
   * @function editSectionMode
   * @param id comes from <EventSection /> props
   * @desc enter in edit mode of the section
   */

  const editSectionMode = async (id, title) => {
    // saves before going to section
    if (needsToSave) {
      toast.warn("You modify the event, please save before continue");
    }
    if (!needsToSave) {
      return goToAndSlugify(id, title);
    }
  };

  /**
   * @function goToAndSlugify
   * @param eventName
   * @desc redirects and creates an object to create the event
   */
  const goToAndSlugify = (id, title) => {
    // TODO do it with regex
    // if a title is not set it uses the id of the section
    if (title === "Title" || title === "title" || title === "TITLE") {
      return history.push(`/admin/event/sections/${id}`, {
        isNew: true,
        slug: slugify(title),
        title: title,
        id: id,
        nameIdentifier: event.nameIdentifier, // name of the current event
      });
    }
    // it uses the title
    return history.push(`/admin/event/sections/${slugify(title)}`, {
      isNew: true,
      slug: slugify(title),
      title: title,
      id: id,
      nameIdentifier: event.nameIdentifier, // name of the current event
    });
  };

  /**
   * @function saveSectionTitle
   * @param noParam
   * @desc to save when sectin title changes
   */
  const saveSectionTitle = () => {
    setNeedsToSave(true);
  };

  /**
   * @function eventNameUpdate
   * @param eventName comes from <EventName />
   * @desc fired when the event name changed
   */
  const eventNameUpdate = (eventName) => {
    // create a new obj that fires a saving with useEffect
    // new slug
    const slug = slugify(eventName);
    // push new data into event
    setEvent({
      ...event,
      title: eventName,
      slug: slug,
      nameIdentifier: slug, // new name identifier
      oldNameIdentifier: event.slug, // old name identifier just for the search
      sections: [...sections],
    });
    setNeedsToSave(true);
  };

  // * Listener to avoid the user to go back without saving
  unBlock(needsToSave, history);

  return (
    <div className={classes.page}>
      <Container maxWidth="md" className={classes.container}>
        {/* Error/success msg TOP */}

        {/* // TODO ERROR IF EVENT IS UNDEFINED */}
        {event === undefined ? null : (
          <Grid container direction="row" /* spacing={2} */>
            <Grid container className={classes.eventHeaderTab}>
              <Grid item xs={9}>
                <PopUpDialogBox
                  open={openDeleteDialogBox}
                  isClose={toggleDeleteDialogBox}
                  confirm={deleteEvent}
                  confirmButtonTitle="Delete Event"
                  messageTitle={`Are you sure you want to delete the ${event.title} section?`}
                  messageBody="Deleting a section will permanently erase it from the event."
                />
                {/* 
                      // * Name of Event Input
                      */}
                <EventName
                  // important to fire the event name update
                  eventNameUpdate={eventNameUpdate}
                  title={event.title}
                  slug={event.slug}
                  getEventName={createAndSendEvent}
                />
              </Grid>
              {/* Delete Event */}
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                {/* // ?  temporarly disabled, to implement? */}
                {/* // TODO add check saving */}
                <CustomButton
                  text="Account"
                  startIcon="arrowBack"
                  onClickFunc={() => goBackToPage(needsToSave, history)}
                />
                <ButtonGroup className={classes.eventBtnGrp}>
                  <CustomIconButton
                    icon="save"
                    disabled={!needsToSave}
                    onClickFunc={saveEvent}
                    // make a focus light so the user knows to save
                    style={{
                      backgroundColor: !needsToSave ? "inherit" : "#26b519",
                    }}
                  />
                  {/* // ?  temporarly disabled, to implement? */}
                  {/* // TODO add check saving */}
                  <CustomIconButton
                    color="error"
                    icon="delete"
                    onClickFunc={toggleDeleteDialogBox}
                  />
                </ButtonGroup>
              </Grid>
            </Grid>
            {/* // * Header */}
            <Grid item xs={3}></Grid> {/* empty for styling */}
            <Grid item xs={9}>
              <h3 className={classes.gridContentHeader}>Guide</h3>
            </Grid>
            {/* 
        // * Add BTN + Disabled ones
        */}
            <Grid className={classes.btnSidebar} item xs={3}>
              {/* <CustomButton
                text="Intro"
                endIcon="add"
                onClickFunc={() => addIntro()}
              /> */}
              <CustomButton
                text="Section"
                endIcon="add"
                onClickFunc={() => addToContents()}
              />

              {/* <ButtonGroup
                className={classes.btnGroup}
                disabled
                orientation="vertical"
                aria-label="vertical outlined primary button group"
              >
                <Button endIcon={<Add />}>Pay-wall</Button>
                <Button endIcon={<Add />}>Feedback</Button>
                <Button endIcon={<Add />}>Map</Button>
              </ButtonGroup> */}
            </Grid>
            {/* 
        // * SECTIONS CONTAINER -> GUIDE
        */}
            <Grid item xs={9} className={classes.sectionsContainer}>
              {/* Displaying the current sections */}

              {sections
                .sort((a, b) => a.order - b.order)
                .map((section, i) => {
                  return (
                    <EventSection
                      key={i}
                      section={section}
                      sectionToDelete={deleteSection}
                      handleDrag={handleDrag}
                      handleDrop={handleDrop}
                      editSection={editSectionMode}
                      saveSectionTitle={saveSectionTitle} // to save when sectin title changes
                    />
                  );
                })}
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
