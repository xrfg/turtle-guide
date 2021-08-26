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
    // Custom margins container buttons
    gridContainer: {
      marginTop: "10px",
      marginBottom: "10px",
      backgroundColor: theme.palette.common.blue,
    },
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

  // TODO Create Block with various options
  // TODO ICONS In block
  // TODO Cloudinary authetication
  // TODO Add widget cloudinary transformation

  //* Cloudinary setup
  // setup for the widget cloudinary
  let cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dhdgj2ryu", // cloud name of the account
      uploadPreset: "turtle_guide", // name of the created upload
    },
    (error, result) => {
      // if error returns error
      if (error) return console.log("Error on upload", error);
      // calls function
      checkCloudinaryUpload(result);
    }
  );
  /**
   * @function showCloudinaryWidget
   * @desc Function that calls cloudinary
   * @param widget i.e. showCloudinaryWidget(cloudinaryWidget)
   */
  const showCloudinaryWidget = (widget) => {
    cloudinaryWidget.open();
  };

  /**
   * @function checkCloudinaryUpload
   * @desc Function that checks the results of cloudinary
   * @param result i.e. checkCloudinaryUpload(result)
   */
  const checkCloudinaryUpload = async (result) => {
    // if event ended
    if (result.event === "queues-end") {
      // temporary array to send into state
      let arrTemp = [];
      // map and send objects IMAGE
      result.info.files.map((x, i) => {
        // TODO TEST undefined
        // if undefined
        if (x == undefined) {
          return console.log("Upload error");
        }

        // push objs created with the
        // functions createObj AND objToSendImage
        arrTemp.push(createObj(objToSendImage(x)));

        // call function to set state
        return addToContents(arrTemp);
      });
    }
  };

  // * Objects to send functions
  // functions that are returning objs to create the content
  // types: image, video,audio, text, qrcode

  /**
   * @function objToSendImage
   * @param {obj}
   * @desc creates an obj for ad image OR a video
   */
  const objToSendImage = (obj) => {
    console.log(obj);

    // TODO add type image OR video

    const objToSend = {
      type: "image", // video/mp4
      content: {
        url: obj.uploadInfo.url,
        url_thumb: obj.uploadInfo.thumbnail_url,
      },
    };
    return objToSend;
  };

  // * General Functions

  /**
   * @function createObj
   * @param {type:"image", content: {url:"http://...", url_thumb:"http://"}}
   * @param {type:"text", content: {title:"Title", text:"text"}}
   * @return an obj
   * @desc create an obj to add
   */

  const createObj = (obj) => {
    // create id based on the contents already into the array
    const id = contents.length === 0 ? 1 : contents[contents.length - 1].id + 1;

    // Obj Content
    const objContent = {
      id: id, // sequential unique id
      type: obj.type, // it can be whatever "text", "image", "video", "qrcode"
      // the content
      content: obj.content,
    };

    return objContent;
  };

  /**
   * @function addToContents
   * @param newContentsArr // newContentsArr to add
   * @desc adds a content into the state "contents" that will be mapped
   */
  const addToContents = (newContentsArr) => {
    setContents([...contents, ...newContentsArr]);
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
              onClick={() => showCloudinaryWidget(cloudinaryWidget)}
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
              onClick={() => addToContents(createObj("audio"))}
            >
              add Audio
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
            {/* // ? map contents state */}
            {!contents
              ? null
              : contents.map((x, i) => {
                  return <ContentBlock item={x} key={x.id} />;
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
