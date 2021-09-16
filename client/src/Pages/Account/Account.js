/**
 * @desc Home page of the admin part
 * retrieves all the account info (events, about)
 * with -> possibility to go into an event or create a new one
 * or -> edit the about admin page
 */

import React, { useEffect, useState } from "react";

// * react-router-dom
import { Link as RouterLink } from "react-router-dom";

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
  makeStyles,
  Link,
} from "@material-ui/core";

// * Component Imports
import EventNameInsert from "./EventNameInsert";
import CustomIconButton from "../../Components/Buttons/CustomIconButtons/CustomIconButton";

const useStyles = makeStyles((theme) => ({
  container: { ...theme.admin.container }, // main Admin container class
  card: {
    // marginTop: "10rem",
    // padding: "1rem",
    textAlign: "center",
  },
  cardTitleBox: {
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderBottom: "1px solid #3C6E71",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: "1.6rem",
  },
  cardActions: { flexDirection: "column" },
  link: {
    padding: "0.5rem",
    color: "#3C6E71",
    transition: "all 0.2s",
    "&:hover": { color: "black" },
  },
}));

const Account = (props) => {
  // * Hooks
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const token = useSelector((state) => state.user.token);

  //* States
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // retrieves all the account's info on landing
  useEffect(() => {
    dispatch(eventsFetch(token)); // for user events
    //eslint-disable-next-line
  }, []);

  // "+" onClick function to toggle the TextField <EventNameInsert/>
  const addEvent = () => {
    setIsAddingEvent((prev) => !prev);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardTitleBox}>
              <Typography component="span" className={classes.cardTitle}>
                Events
              </Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
              {events &&
                events.map((event) => {
                  return (
                    <Link
                      component={RouterLink}
                      className={classes.link}
                      to={`/admin/event/${event.slug}`}
                      underline="none"
                    >
                      <Typography component="span">{event.title}</Typography>
                    </Link>
                  );
                })}

              {isAddingEvent ? (
                <EventNameInsert />
              ) : (
                // Custom Icon Component
                <CustomIconButton
                  color="primary"
                  onClickFunc={addEvent}
                  icon="add"
                />
              )}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            {/* Just a link to <AboutAdmin /> the compentn will fetch the user info */}
            <Link
              component={RouterLink}
              className={classes.link}
              to="/admin/about"
              underline="none"
            >
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
