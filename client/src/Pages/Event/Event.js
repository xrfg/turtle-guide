/* 
? Event Page at route /create-event either for creating a new event or editing an existing one
*/

import React, { useState } from "react";

// * material UI imports
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
import { Add, Delete, Save } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  nameInput: { width: "26rem" },
  saveBtn: {
    height: "100%",
    alignSelf: "center",
  },
  deleteBtn: {},

  btnGrp: {
    display: "flex",
  },
  card: {},
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
      <Grid container direction="row" justifyContent="start" spacing={2}>
        {/* * Name Input */}
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

        {/* Delete Event */}
        <Grid item xs={3} className={classes.deleteBtn}>
          <Button
            // TODO create a modal to make sure the admin wants to delete the event
            onClick={() => alert("are you sure?")}
            color="secondary"
            endIcon={<Delete />}
          >
            Delete Event
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.btnGrp}>
          <ButtonGroup
            orientation="vertical"
            color="primary"
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
            color="primary"
            aria-label="vertical outlined primary button group"
          >
            <Button endIcon={<Add />}>Pay-wall</Button>
            <Button endIcon={<Add />}>Feedback</Button>
            <Button endIcon={<Add />}>Map</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" component="h4">
                Your Guide
              </Typography>
              {/* Displaying the current sections */}
              {sections.map((section, i) => {
                return <Paper key={i}>{section.title}</Paper>;
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
