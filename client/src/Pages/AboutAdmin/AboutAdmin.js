import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Container, Grid, Card,CardContent,Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    mainContainer: {
      display: "flex",
    },
    btnSection: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    overview: {
      height:"fit-content",
    },
    input: {
      display: "none",
    },
  })
);

export default function AboutAdmin() {
  const [overview, setOverview] = useState([]);

  const classes = useStyles();

  return (
    <Container>
      <h1>customize how visitors will see your guide </h1>
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid item xs={6} className={classes.btnSection}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
            >
              add image
            </Button>
          </label>
          <input
            accept="vedio/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
            >
              add vedio
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
            >
              add audio
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
            >
              add QR code link
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
            >
              add image description
            </Button>
          </label>
        </Grid>
        <Grid xs={6}>
          <Card className={classes.overview}>
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Container>
  );
}
