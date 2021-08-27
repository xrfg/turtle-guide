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

  const [openDeleteMsg, setOpenDeleteMsg] = useState(false);

  // onClick for Button adds a section to the content-container

  // * Functions

  /**
   * @function addToContents
   * @param newContentsArr // newContentsArr to add
   * @desc adds a content into the state "contents" that will be mapped
   */
  const addToContents = (newSectionsArr) => {
    // add ids
    // create id based on the contents already into the array
    // if [contents] s empty assigns the index
    newSectionsArr.forEach((item, index) => {
      if (sections.length === 0) {
        item["id"] = index + 1;
      } else {
        item["id"] = sections[sections.length - 1].id + index + 1;
      }
    });

    setSections([...sections, ...newSectionsArr]);
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

  const handleClickDeleteOpen = () => {
    setOpenDeleteMsg(true);
  };

  const handleClickDeleteClose = () => {
    setOpenDeleteMsg(false);
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
                {sections.map((section) => {
                  return (
                    <EventSection
                      section={section}
                      sectionToDelete={deleteSection}
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
