/**
 * @desc Component that creates/edit the info of
 * the account (i.e. the museum)
 */
import React, { useState, useEffect } from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";

// TODO
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

// * Pages

// * Components

// <ContentBlock />
// requires props "item" <ContentBlock item={}/>
import ContentBlock from "../../Components/ContentBlock/ContentBlock";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
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
      height: "fit-content",
    },
    input: {
      display: "none",
    },
    media: {
      height: 140,
    },
  })
);

export default function AboutAdmin() {
  const classes = useStyles();

  // TODO Integrate cloudinary
  // TODO Create Block with various options
  // TODO ICONS In block

  /**
   * @function createObj
   * @param objType // image/text/video/
   * @return an obj
   * @desc create an obj to add
   *
   */

  const createObj = (objType) => {
    // Obj Content
    const objContent = {
      id: 1, // sequential unique id
      type: objType, // it can be whatever
      // the content
      content: {
        title: "title",
        text: "text",
      },
    };

    return objContent;
  };

  // * States
  // state that contains all the contents
  const [contents, setContents] = useState([]);

  // * Functions
  /**
   * @function addToContents
   * @param obj // obj to add
   * @desc adds a content into the array "arr" and state "contents"
   */

  const addToContents = (obj) => {
    setContents([...contents, obj]);
  };

  return (
    <Container maxWidth="sm">
      {/* // ? Buttons container */}
      <Grid container spacing={3}>
        <h1>customize how visitors will see your guide </h1>
        <Grid item xs={3} className={classes.btnSection}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            component="span"
            onClick={() => addToContents(createObj("text"))}
          >
            add Content
          </Button>
        </Grid>
      </Grid>

      {/* // ? Contents container */}
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.btnSection}>
          {/* 
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
          </label> */}
        </Grid>
        <Grid xs={9}>
          {!contents
            ? null
            : contents.map((x, i) => {
                return <ContentBlock item={x} />;
              })}
        </Grid>
      </Grid>
    </Container>
  );
}
