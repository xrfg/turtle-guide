/**
 * @desc Component that creates/edit content of a section or about admin
 */

// TODO Cloudinary authetication
// TODO Add widget cloudinary transformation
// TODO move menus to external component that takes props
// TODO Externalize funcitions
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
//  <ContentBlockMedia />
// requires props "item" <ContentBlockMedia item={}/>
import ContentBlockMedia from "../../Components/ContentBlockMedia/ContentBlockMedia";
// requires props "item" <ContentBlockText item={}/>
import ContentBlockText from "../../Components/ContentBlockText/ContentBlockText";
import TextEditor from "../../Components/Inputs/TextEditor";

// <ModalCustom content={a content} isOpen={state} isClose={function}/>
import ModalCustom from "../../Components/Modal/ModalCustom";

// <SectionPreview />
// requires props "contents" <SectionPreview contents={ }/>
import SectionPreview from "../../Components/SectionPreview/SectionPreview";

// * Other Imports
import { DefaultEditor } from "react-simple-wysiwyg";

// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { eventUpdate } from "../../store/actions/eventsActions";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
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

// ! takes ID as prop and looks into state (to get with useSelector)
// ! and maps contents
export default function SectionContentManager(props) {
  // * Destruc
  const {
    state: { id, title, slug, nameIdentifier },
  } = props;

  console.log("<SectionCM/>", id, title, slug, nameIdentifier);

  // * Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const events = useSelector((state) => state.events.events);

  // * States
  // state that contains all the contents
  const [contents, setContents] = useState([]);
  // event
  const [event, setEvent] = useState({});
  // section
  const [section, setSection] = useState({});
  // for save
  const [needsToSave, setNeedsToSave] = useState(false);

  // for modal
  const [openModalInsertText, setOpenModalInsertText] = useState(false);
  const [openModalPreview, setOpenModalPreview] = useState(false);

  // * Life cycles Methods
  // set the section
  useEffect(() => {
    // find the event
    const getEvent = events.find((x) => x.nameIdentifier === nameIdentifier);
    // set the event to be modified and sent for saving
    setEvent(getEvent);
    // get the section with the id
    const getSection = getEvent.sections.find((x) => x.id === id);
    setSection(getSection);
    setContents(getSection.contents);
    //eslint-disable-next-line
  }, []);

  console.log("section", section);

  // * Modals CTRLs
  const handleOpen = (modal) => {
    if (modal === "insertText") {
      return setOpenModalInsertText(true);
    }
    if (modal === "preview") {
      return setOpenModalPreview(true);
    }
  };

  const handleClose = () => {
    setOpenModalInsertText(false);
    setOpenModalPreview(false);
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
   * and sends to add content
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
    // define type to create the content
    const type = (type) => {
      if (type.includes("image")) return "image";
      if (type.includes("video")) return "video";
      if (type.includes("audio")) return "audio";
      if (type.includes("text")) return "text";
    };

    // if is a text send a different obj
    if (obj.type.includes("text")) {
      const objToSend = {
        type: type(obj.type), // use function
        content: obj.content,
      };
      // put it into an array
      // so the function addToContents can loop and add id
      return [objToSend];
    }

    // Or create obj for the media types
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
   * @param {type:"text", content: "Text about something"}
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
    // set to save
    setNeedsToSave(true);
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
    // set to save
    setNeedsToSave(true);
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
    // set to save
    setNeedsToSave(true);
  };

  /**
   * @function setMediaText
   * @param obj that come from <TextInput />
   * @desc gets text and add to content
   */
  const setMediaText = (obj) => {
    // create obj
    const objToSend = { type: "text", content: obj };
    // Add to contents
    addToContents(objToSendMedia(createObj(objToSend)));
    // close modal
    handleClose();

    // set to save
    setNeedsToSave(true);
  };

  /**
   * @function updateMediaText
   * @desc for the text field to update
   * @param id coming from the prop of <ContentBlockText />
   * @param newContent coming from the prop of <ContentBlockText />
   */
  const updateMediaText = (id, newContent) => {
    // close modal
    handleClose();

    // updates into state/array
    contents.forEach((x, i) => {
      if (x.id === id) {
        return (x.content = newContent);
      }
    });
    // set to save
    setNeedsToSave(true);
  };

  /**
   * @function saveContent
   * @param noParam
   * @desc saves the content dispatching an action
   */

  const saveContent = async () => {
    // 1. create the event
    // creates the new obj section spreading the old section into the state
    const newSection = { ...section, contents: contents };
    // 2. update the section into the event
    // find index for splice
    const findIndex = event.sections.findIndex(
      (x) => x.NameIdentifier === nameIdentifier
    );

    // 3. replace with the new section with splice
    event.sections.splice(findIndex, 1, newSection);

    // 4. dispatch event update
    console.log("eventToSave", event);
    try {
      await dispatch(eventUpdate(event));
      // set to save
      setNeedsToSave(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @function goBackToEvent
   * @desc go back to the event
   */

  const goBackToEvent = () => {
    if (needsToSave) {
      if (
        window.confirm(`Ypu didn't save! Are you sure you want to go to back?`)
      ) {
        history.goBack();
      } else {
        return false;
      }
    } else {
      history.goBack();
    }
  };

  // * Listener to avoid the user to go back without saving
  let unblock = history.block((tx) => {
    if (!needsToSave) {
      return null;
    }
    if (window.confirm(`Are you sure you want to go to Event?`)) {
      // Unblock the navigation.
      unblock();
      history.goBack();
    } else {
      return false;
    }
  });

  return (
    <>
      <Container maxWidth="sm">
        {/* // * MODAL */}
        <ModalCustom
          content={<TextEditor setText={setMediaText} />}
          isOpen={openModalInsertText}
          // handles the state when the modal is clickes outside the area
          isClose={handleClose}
        />
        <ModalCustom
          content={<SectionPreview contents={contents} />}
          isOpen={openModalPreview}
          // handles the state when the modal is clickes outside the area
          isClose={handleClose}
        />
        <Grid item xs={12} className={classes.btnSection}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <h2>{title}</h2>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.btnSection}>
          <Grid container spacing={3} className={classes.gridContainer}>
            {/* // * Buttons Top container */}
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              disabled={!needsToSave}
              onClick={saveContent}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={goBackToEvent}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.btnSection}>
          <Grid container spacing={3} className={classes.gridContainer}>
            {/* // * Buttons Top container */}
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              onClick={() => handleOpen("insertText")}
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
            <Button
              size="small"
              variant="contained"
              color="primary"
              component="span"
              //
              onClick={() => handleOpen("preview")}
            >
              Preview{" "}
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
                  if (x.type === "text") {
                    return (
                      <ContentBlockText
                        item={x}
                        key={x.id}
                        // receives the id of the item to delete
                        itemToDelete={deleteItem}
                        // gets the new content to update
                        newContent={updateMediaText}
                      />
                    );
                  }
                  return (
                    <ContentBlockMedia
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
