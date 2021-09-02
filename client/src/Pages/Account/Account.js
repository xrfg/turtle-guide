/**
 * @desc Home page of the admin part
 * retrives all the account info
 */

import React, { useEffect, useState } from "react";

// * react-router-dom
import { Link, NavLink } from "react-router-dom";

// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { eventsFetch } from "../../store/actions/eventsActions";

// * ACTIONS
import { eventCreate } from "../../store/actions/eventsActions";

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
import EventName from "./EventNameInsert";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "10rem",
    textAlign: "center",
    position: "relative",
  },
  link: { textDecoration: "none", color: "inherit", width: "100%" },
  btn: { width: "100%" },
  box: { flexDirection: "column" },
}));

const Account = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  //* States
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [event, setEvent] = useState();

  // useEffect that check retrives all the account's info
  // ? should be the models user and event linked in MONGO
  useEffect(() => {
    dispatch(eventsFetch()); // for user events
    // dispatch() // for user data
    //eslint-disable-next-line
  }, []);

  // * add an event on click "+"
  const addEvent = () => {
    setIsAddingEvent((prev) => !prev);
  };

  // const createAndSendEvent = (eventName) => {
  //   console.log("the event name is", eventName);

  //   // ! the event will be save into mongo and the will check the existence
  //   // ! of the indentifier / slug
  //   // ! and in case will throw errors
  //   // TODO create slug with a regex or a library

  //   setEvent({
  //     title: eventName,
  //     nameIdentifier: eventName, // fucntion to make the slug
  //     slug: eventName, // will be the same
  //     description: "description", // ? is to do?
  //     sections: [],
  //     // TODO CHANGE ACCOUNT
  //     // WILL BET SENT ONCe IS LOGGED IN
  //     account: "611e5aca56104a1c09f9d13e",
  //     // ! spread obj
  //   });
  // };

  // // fires when the state event is created/updated
  // useEffect(() => {
  //   console.log("event", event);
  //   // if event is empty do not dispatch
  //   if (!event) {
  //     return null;
  //   }
  //   // dispatch the event to redux
  //   dispatch(eventCreate(event));
  //   //eslint-disable-next-line
  // }, [event]);

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
            <CardActions className={classes.box}>
              {events &&
                events.map((event, i) => {
                  return (
                    <Button
                      className={classes.btn}
                      variant="text"
                      color="primary"
                    >
                      {/* // ! go to section <Event id={EVENT ID from mongo array}/> giving the id   */}
                      {/* // ! send the obj <Event id={events[i]} */}
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
                <EventName />
              ) : (
                // <EventName getEventName={createAndSendEvent} />
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
                {/* // TODO Check if first LINK is needed or not */}
                {/* <Link className={classes.link} href="/aboutadmin"> */}
                <Typography variant="h3" component="span">
                  About
                </Typography>
                {/* </Link> */}
              </CardContent>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
