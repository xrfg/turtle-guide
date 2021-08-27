/**
 * @desc Component that creates/edit the info of
 * the account (i.e. the museum)
 */
import React, { useState, useEffect, useCallback } from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
//  <ContentBlock />
// requires props "item" <ContentBlock item={}/>
import ContentBlock from "../../Components/ContentBlock/ContentBlock";
// <SectionPreview />
// requires props "contents" <SectionPreview contents={ }/>
import SectionPreview from "../../Components/SectionPreview/SectionPreview";

// * Other Imports
import { DefaultEditor } from "react-simple-wysiwyg";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
    },
    // * Modal CSS
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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

// TODO Cloudinary authetication
// TODO Add widget cloudinary transformation
// TODO Image description
// TODO move menus to external component that takes props

export default function AboutAdmin() {
  const classes = useStyles();

  // * States
  // state that contains all the contents
  const [contents, setContents] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // * Modal CTRLs
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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
  const checkCloudinaryUpload = (result) => {
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
        arrTemp.push(createObj(objToSendMedia(x)));

        // call function to set state
        return addToContents(arrTemp);
      });
    }
  };

  // * Objects to send functions
  /**
   * @function objToSendMedia
   * @param {obj}
   * @desc creates an obj for ad image OR a video to create the content
   * @types image, video, audio, text, qrcode
   */
  const objToSendMedia = (obj) => {
    // define type
    const type = (type) => {
      if (type.includes("image")) return "image";
      if (type.includes("video")) return "video";
      if (type.includes("audio")) return "audio";
    };

    const objToSend = {
      type: type(obj.type), // use function
      content: {
        filename: obj.uploadInfo.original_filename,
        public_id: obj.uploadInfo.public_id,
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
    // Obj Content WITOUT id
    // it will be added before setting the contents
    const objContent = {
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
    // add ids
    // create id based on the contents already into the array
    // if [contents] s empty assigns the index
    newContentsArr.forEach((x, i) => {
      x["id"] =
        contents.length === 0
          ? i + 1
          : contents[contents.length - 1].id + i + 1;
    });
    setContents([...contents, ...newContentsArr]);
  };

  /**
   * @function deleteItem
   * @param id sent from the <Child />
   * @desc returns the item to delete from the array
   */
  const deleteItem = (id) => {
    // IMPORTANT
    //  filter returns an array so updates the contents
    const newContents = contents.filter((x) => x.id !== id);
    // set new content
    setContents(newContents);
  };

  /**
   * @function addMediaCaption
   * @param id element id
   * @param caption the caption to add
   * @desc add media caption to the element into the array (state)
   */
  const addMediaCaption = (id, caption) => {
    contents.forEach((x) => {
      if (x.id === id) {
        x.content["caption"] = caption;
      }
    });
  };

  /**
   * @desc
   */

  const setMediaText = (obj) => {
    console.log("setMediaText", obj);
  };
  // * WYSIWYG Editor
  // <DefaultEditor /> is into a component to avoid re-renders

  const TextInput = (props) => {
    // state into function
    const [html, setHtml] = useState("Insert Your Text Here");
    // useCallback to
    const onChange = useCallback(
      (e) => {
        setHtml(e.target.value);
        props.setText(html);
      },
      // eslint-disable-next-line
      [html]
    );

    return (
      <DefaultEditor
        value={html}
        onChange={onChange}
        // ! test onSubmit
        onSubmit={() => console.log("onSubmit EDITOR")}
      />
    );
  };

  const ModalCustom = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Insert Text</h2>
            <p id="transition-modal-description">
              {/* <DefaultEditor
                value={html}
                onChange={onChange}
                onSubmit={() => console.log("onSubmit EDITOR")}
                  // ! test onSubmit

              /> */}
              <TextInput setText={setMediaText} />
            </p>
          </div>
        </Fade>
      </Modal>
    );
  };

  return (
    <>
      <Container maxWidth="sm">
        {/* // * MODAL */}
        <ModalCustom />
        {/* <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Insert Text</h2>
              <p id="transition-modal-description">
                <DefaultEditor
                  value={html}
                  onChange={onChange}
                />
              </p>
            </div>
          </Fade>
        </Modal> */}
        {/* // * Buttons Top container */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.btnSection}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={handleOpen}
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
              add Media
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
        {/* // ? Contents container */}
        {/* // ? Add content */}
        <Grid container spacing={3}>
          <Grid xs={12} className={classes.gridContent}>
            <h3>Contents</h3>
            {/* // ? map contents state */}
            {!contents
              ? null
              : contents.map((x, i) => {
                  return (
                    <ContentBlock
                      item={x}
                      key={x.id}
                      // receives the id of the item to delete
                      itemToDelete={deleteItem}
                      mediaCaption={addMediaCaption}
                    />
                  );
                })}
          </Grid>
        </Grid>
        {/* // ? Buttons Bottom container */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.btnSection}>
            {/* // ! TEMPORARLY DISABLED */}
            {/* <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={() => addToContents(createObj("text"))}
            >
              Preview{" "}
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// ? Preview
{
  /* <Grid xs={6} className={classes.gridPreview}>
            <SectionPreview contents={contents} />
          </Grid>
        </Grid> */
}
