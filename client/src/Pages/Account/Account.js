import React from "react";
import { Link } from "react-router-dom";
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

  // this are only examples of what we would get from the database (events, urls)
  const events = ["Van Gogh"];
  const urls = ["van-gogh"];
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
                      <Link className={classes.link} to={`/${urls[i]}`}>
                        {event}
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
            <CardContent>
              <Link className={classes.link} href="/aboutadmin">
                <Link className={classes.link} to="/aboutadmin">
                  <Typography variant="h3" component="span">
                    About
                  </Typography>
                </Link>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
