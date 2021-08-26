/* 
? Event Page at route /create-event either for creating a new event or editing an existing one
*/

import React, { useState } from "react";

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
} from "@material-ui/core";
// * material UI imports Icons
import { Add, Delete, Save, Forward } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  nameInput: { width: "26rem" },
  saveBtn: {
    height: "100%",
    alignSelf: "center",
  },
  deleteBtn: {
    marginTop: 13,
  },

  btnGrp: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  guide__header: { marginBottom: "1rem" },
  card: { position: "relative", textAlign: "center", marginBottom: "1rem" },
  card__title: {},
  card__desc: {},
  forwardIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export default function Event(props) {
  const classes = useStyles(props);

  // * States
  const [sections, setSections] = useState([]);
  const [eventName, setEventName] = useState("");

  // onClick for Button adds a section to the content-container

  // * Functions
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

  // ? saves the TextField input w/ event's name
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventName);
  };

  return (
    <Container maxWidth="md">
      {/* 
        // * Name of Event Input
        */}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={9}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            style={{ display: "flex" }}
          >
            <TextField
              required
              id="eventName"
              label="eventName"
              type="text"
              style={{ margin: 8 }}
              defaultValue="name coming from the database ? event : null"
              placeholder="Name for the Event"
              helperText="This will be the public name of the Event"
              margin="normal"
              className={classes.nameInput}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setEventName(e.target.value)}
            />
            <Button className={classes.saveBtn} type="submit">
              <Save />
            </Button>
          </form>
        </Grid>

        {/* 
        // * Delete Event 
        */}
        <Grid item xs={3} className={classes.deleteBtn}>
          <Button
            // TODO create a modal to make sure the admin wants to delete the event
            onClick={() => alert("are you sure?")}
            endIcon={<Delete />}
            className={classes.deleteBtn}
          >
            Delete Event
          </Button>
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
              {sections.map((section, i) => {
                return (
                  <Card className={classes.card} key={i}>
                    <CardContent>
                      <Typography
                        className={classes.card__title}
                        variant="h6"
                        component="h6"
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        className={classes.card__desc}
                        variant="subtitle1"
                        component="p"
                      >
                        {section.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        href={`${section.url}`}
                        className={classes.forwardIcon}
                        size="small"
                      >
                        <Forward />
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
