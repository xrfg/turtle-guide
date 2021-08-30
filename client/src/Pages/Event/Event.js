/* 
? Event Page at route /create-event either for creating a new event or editing an existing one
*/

import React, { useState } from "react";

// * Components Imports (children)
import EventSection from "./EventSection";
import EventName from "./EventName";

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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
// * material UI imports Icons
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  deleteBtn: {
    backgroundColor: theme.palette.common.purple,
    marginTop: 13,
  },
  btnGrp: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  guide__header: { marginBottom: "1rem" },
}));

export default function Event(props) {
  const classes = useStyles(props);

  // * States
  const [sections, setSections] = useState([]);

  // for the "Delete Event" modal handlers
  const [openDeleteMsg, setOpenDeleteMsg] = useState(false);

  // for the drag and drop sections re-ordering
  const [dragId, setDragId] = useState();

  // * Functions

  /**
   * @function findBiggestId
   * @desc returns a Number -> biggest existing integer of an "id" from the sections array
   * is aiding the assigning of id's to new sections in function addToContents
   */

  const findBiggestId = (e) => {
    let biggestId = 1;
    sections.forEach((section) => {
      if (section.id > biggestId) {
        biggestId = section.id;
      }
    });
    return biggestId;
  };

  /**
   * @function addToContents
   * @param newContentsArr
   * @desc adds a content into the state "contents" that will be mapped
   */

  const addToContents = (newSectionsArr) => {
    // add ids
    // create "id" based on the contents already into the array, from the biggestId present on
    // if [contents] s empty assigns the index

    const bigId = findBiggestId();

    newSectionsArr.forEach((section, i) => {
      if (sections.length === 0) {
        section["id"] = i + 1;
        section["order"] = i + 1;
      } else {
        // find the section with the biggest id
        const lastSection = sections.find((section) => section.id === bigId);

        section["id"] = lastSection.id + i + 1;
        section["order"] = lastSection.id + i + 1;
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
  };

  // * ----------- Functions to handle the "Delete Event" Modal

  /**
   * @function handleClickDeleteOpen
   * @desc sets state to true to pop up the modal
   */
  const handleClickDeleteOpen = () => {
    setOpenDeleteMsg(true);
  };

  /**
   * @function handleClickDeleteClose
   * @desc sets state to false to close up the modal
   */
  const handleClickDeleteClose = () => {
    setOpenDeleteMsg(false);
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
    console.log("sections", sections);
    console.log("dragID", dragId);

    // * Finding the drag section with the same id as the one the user is trying to drag from
    const dragSection = sections.find((section) => {
      console.log(typeof section.id, typeof dragId, section.id === dragId);
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

  return (
    <Container style={{ padding: "2rem 0" }} maxWidth="md">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={9}>
          {/* 
        // * Name of Event Input
        */}
          <EventName />
        </Grid>

        {/* 
        // * Delete Event 
        */}
        <Grid item xs={3}>
          <Button className={classes.deleteBtn} onClick={handleClickDeleteOpen}>
            Delete Event
          </Button>
          <Dialog
            open={openDeleteMsg}
            onClose={handleClickDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Are you sure you want to delete the EVENTNAME event?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleting an event will permanently erase it from the admin's
                event collection. If you choose only to set it to private, check
                settings.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClickDeleteClose}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
              <Button onClick={handleClickDeleteClose} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/* 
        // * Button Group
        */}
        <Grid item xs={4} className={classes.btnGrp}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined primary button group"
          >
            <Button
              onClick={() => {
                addToContents([
                  {
                    type: "section",
                    id: 0,
                    order: 0,
                    url: "",
                    title: "Title",
                    description: "Description",
                  },
                ]);
              }}
              endIcon={<Add />}
            >
              Section
            </Button>
          </ButtonGroup>
          <ButtonGroup
            disabled
            orientation="vertical"
            aria-label="vertical outlined primary button group"
          >
            <Button endIcon={<Add />}>Pay-wall</Button>
            <Button endIcon={<Add />}>Feedback</Button>
            <Button endIcon={<Add />}>Map</Button>
          </ButtonGroup>
        </Grid>

        {/* 
        // * SECTIONS CONTAINER -> GUIDE
        */}
        <Grid item xs={8}>
          <Box filled>
            <CardContent>
              <Typography
                variant="h5"
                component="h3"
                className={classes.guide__header}
              >
                Guide
              </Typography>
              {/* Displaying the current sections */}
              <ul>
                {sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => {
                    return (
                      <EventSection
                        section={section}
                        sectionToDelete={deleteSection}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                      />
                    );
                  })}
              </ul>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
