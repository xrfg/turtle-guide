/**
 * @desc Component that creates/edit the info of
 * the account (i.e. the museum)
 */
import React, { useState, useEffect } from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

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

// ? Components
// * <ContentBlock />
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
    // * Custom CSS
    // Custom margins container
    gridContainer: { marginTop: "10px", marginBottom: "10px" },
    // Custom margins nested grid
    // ! Classes created but not styled yet
    containerGrids: {},
    gridContent: {},
    gridPreview: {},

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

  // * States
  // state that contains all the contents
  const [contents, setContents] = useState([]);

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
    // create id based on the contents already into the array
    const id = contents.length === 0 ? 1 : contents[contents.length - 1].id + 1;

    // Obj Content
    const objContent = {
      id: id, // sequential unique id
      type: objType, // it can be whatever
      // the content
      content: {
        title: "title",
        text: "text",
      },
    };

    return objContent;
  };

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
    <>
      <Container maxWidth="sm">
        {/* // ? Buttons container */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.btnSection}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={() => addToContents(createObj("text"))}
            >
              add Text
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={() => addToContents(createObj("image"))}
            >
              add Image
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={() => addToContents(createObj("video"))}
            >
              add Video
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={() => addToContents(createObj("qrcode"))}
            >
              add QrCode
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* // ? Contents container */}
      <Container maxWidth="sm" className={classes.containerGrids}>
        {/* // ? Add content */}
        <Grid container spacing={3}>
          <Grid xs={6} className={classes.gridContent}>
            <h3>Contents</h3>
            {!contents
              ? null
              : contents.map((x, i) => {
                  return <ContentBlock item={x} />;
                })}
          </Grid>
          {/* // ? Preview */}
          <Grid xs={6} className={classes.gridPreview}>
            <h3>Preview</h3>
            <Box bgcolor="text.primary" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
