/**
 * @desc Home page of the admin part
 * retrives all the account info
 */

import React, { useEffect } from "react";
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

  // this are only examples of what we would get from the database (events, urls)
  // const events = ["Van Gogh"];
  const urls = ["van-gogh"];

  // useEffect that check retrives all the account's info
  // ? should be the models user and event linked in MONGO
  useEffect(() => {
    dispatch(eventsFetch()); // for user events
    // dispatch() // for user data
    //eslint-disable-next-line
  }, []);
  console.log("events", events);
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
                      {/* // ! go to section <Event id={EVENT ID}/> giving the id   */}
                      <Link className={classes.link} to={`/${urls[i]}`}>
                        {event.title}
                      </Link>
                    </Button>
                  );
                })}

              <Button
                href="/create-event"
                className={classes.btn}
                variant="text"
                color="primary"
              >
                <Link className={classes.link} to="/create-event">
                  <Add />
                </Link>
              </Button>
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
