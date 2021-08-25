import React, { useState, useEffect } from "react";
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
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  btnGrp: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Event(props) {
  let arr = []; /* making this arr to put inside of sections bc async */

  const [sections, setSections] = useState(arr);
  const [section, setSection] = useState({});
  const [rerender, setRerender] = useState(false);

  const classes = useStyles(props);

  /*  firing setState to re render components and show the sections*/
  useEffect(() => {
    setRerender(!rerender);
  }, [sections]);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-full-width"
              label="Name"
              style={{ margin: 8 }}
              defaultValue="name coming from the database ? event : null"
              placeholder="Name for the Event"
              helperText="This will be the public name of the Event"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>

          <Button
            /* create a modal to make sure the admin wants to delete the event */
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
                arr.push({
                  title: "title",
                  description: "content",
                  id: "Id",
                });
                setSections(arr);
                console.log(sections);
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
              <Typography variant="h6" component="span">
                Your Guide
              </Typography>
              {/* displaying the current sections */}
              {sections &&
                sections.map((section, i) => {
                  return <Paper key={i}>{section.title}</Paper>;
                })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
