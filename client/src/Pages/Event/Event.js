/* 
? Event Page at route /create-event either for creating a new event or editing an existing one
*/

// TODO ternary operator On each sections instead of a modal -> if editing SHOW INPUT : <span>title<span/>
// TODO ADD A PEN(EDITING) icon to edit a sections title and desc
// TODO do the same for NAME

import React, { useState } from "react";

// * Components Imports (children)
import EventSection from "./EventSection";
import EventName from "./EventName";

// * material UI imports Components
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Paper,
  Box,
  TextField,
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
import { Add, Delete, Save, Forward } from "@material-ui/icons";
// * material UI imports Theme CLASSES
import { cardStyle } from "../../styles/Theme";
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

  const handleClickDeleteOpen = () => {
    setOpenDeleteMsg(true);
  };

  const handleClickDeleteClose = () => {
    setOpenDeleteMsg(false);
  };

  const addSection = (e) => {
    setSections([
      ...sections,
      {
        title: "title",
        description: "content",
        id: "Id",
        time: e.timeStamp,
      },
    ]);
    console.log(sections);
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
              onClick={(e) => {
                addSection(e);
              }}
              endIcon={<Add />}
            >
              Section
            </Button>
          </ButtonGroup>
          <ButtonGroup
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
                {sections.map((section, i) => {
                  return <EventSection section={section} key={i} />;
                })}
              </ul>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
