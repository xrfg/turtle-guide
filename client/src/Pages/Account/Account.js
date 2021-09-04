/**
 * @desc Home page of the admin part
 * retrieves all the account info (events, about)
 * with -> possibility to go into an event or create a new one
 * or -> edit the about admin page
 */

import React, { useEffect, useState } from "react";

// * react-router-dom
import { Link } from "react-router-dom";

// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { eventsFetch } from "../../store/actions/eventsActions";

// * MAT UI
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

// * Component Imports
import EventNameInsert from "./EventNameInsert";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "10rem",
    padding: "1rem",
    textAlign: "center",
  },
  cardActions: { flexDirection: "column" },
  link: { textDecoration: "none", color: "inherit", width: "100%" },
  /* btn: { width: "100%" }, */
}));

const Account = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  //* States
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // useEffect retrieves all the account's info on landing
  // ? should be the models user and event linked in MONGO
  useEffect(() => {
    dispatch(eventsFetch()); // for user events
    // dispatch() // for user data
    //eslint-disable-next-line
  }, []);

  // "+" onClick function to toggle the TextField <EventNameInsert/>
  const addEvent = () => {
    setIsAddingEvent((prev) => !prev);
  };

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h3" component="span">
                Events
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              {events &&
                events.map((event) => {
                  return (
                    <Button
                      className={classes.btn}
                      variant="text"
                      color="primary"
                    >
                      <Link
                        className={classes.link}
                        to={`/admin/event/${event.slug}`}
                      >
                        {event.title}
                      </Link>
                    </Button>
                  );
                })}

              {isAddingEvent ? (
                <EventNameInsert />
              ) : (
                <Button
                  className={classes.btn}
                  variant="text"
                  color="primary"
                  onClick={addEvent}
                >
                  <Add />
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <Link className={classes.link} to="/aboutadmin">
              <CardContent>
                <Typography variant="h3" component="span">
                  About
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
