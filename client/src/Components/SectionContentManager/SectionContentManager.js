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
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

// toggle button for "preview" or "editing" from MatUI
import { ToggleButton } from "@material-ui/lab";
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

// custom buttons
import CustomIconButton from "../Buttons/CustomIconButtons/CustomIconButton";

// * Other Imports

// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { eventUpdate } from "../../store/actions/eventsActions";

// * Functions
import { goBackToPage, unBlock } from "../../functions/functions";
import ImageHoverButton from "../Buttons/ImageHoverButton";
import CustomButton from "../Buttons/CustomButtons/CustomButton";

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
    sectionTitle: { textAlign: "center", fontSize: "2rem" },
    gridItem: {
      marginTop: "10px",
      marginBottom: "10px",
      // backgroundColor: theme.palette.common.blue,
    },
    btnSidebar: {
      border: `1px solid ${theme.palette.primary.light}`,
      display: "flex",
      flexDirection: "column",
      borderRadius: "5px",
      position: "sticky",
      height: "100%",
      padding: "1rem",
      top: "1rem",
    },
    btnGroup: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "8px",
      overflow: "hidden",
      border: `1px solid ${theme.palette.primary.light}`,
      marginBottom: "1rem",
      "& >*": {
        borderRadius: "0",
        margin: "0",
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        "&:last-child": {
          borderBottom: "0",
        },
      },
    },

    // Custom margins nested grid
    // ! Classes created but not styled yet
    sectionCover: {},
    containerGrids: {},
    gridContent: {},
    gridContentHeader: { fontSize: "1rem", textAlign: "center", color: "gray" },
    gridPreview: {},

    mainContainer: {
      display: "flex",
    },
    btnSection: {},

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

export default function SectionContentManager(props) {
  // * Destruc
  const {
    state: { id, title, slug, nameIdentifier },
    isAboutAdmin = false,
  } = props;

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
  // for dragging (and dropping)
  const [dragId, setDragId] = useState();
  // for cover upload
  // if true loads the image into sectionCover
  let isAddingCover = false;
  // const [isAddingCover, setIsAddingCover] = useState(false);

  // for toggling the selected/not-selected toggle on the preview-the-guide button
  const [toggleSelected, setToggleSelected] = useState(false);

  // for modal
  const [openModalInsertText, setOpenModalInsertText] = useState(false);
  const [openModalPreview, setOpenModalPreview] = useState(false);

  // * Life cycles Methods
  // set the section
  useEffect(() => {
    // if true therefore about admin do not fetch
    if (isAboutAdmin) {
      return;
    }
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

  // TODO REMOVE
  const hardCodedObj = {
    description:
      "<p>Description test  test  test  test test test test test  test test  test  test  test test test test test </p>",
    id: 5,
    order: 1,
    sectionCover: {
      filename: "van-gogh-1",
      public_id: "tf7quie5vltlp1xtnx1r",
      url: "http://res.cloudinary.com/dhdgj2ryu/image/upload/v1631184038/tf7quie5vltlp1xtnx1r.jpg",
      url_thumb:
        "https://res.cloudinary.com/dhdgj2ryu/image/upload/…it,h_60,w_90/v1631184038/tf7quie5vltlp1xtnx1r.jpg",
    },
    slug: "title",
    title: "Section Four",
    type: "section",
    url: "",

    contents: [
      {
        content: {
          filename: "fainalproject-museumsIntroImage",
          public_id: "bf8em0vr30mwvmg66ezu",
          url: "http://res.cloudinary.com/dhdgj2ryu/image/upload/v1631191190/bf8em0vr30mwvmg66ezu.jpg",
          url_thumb:
            "https://res.cloudinary.com/dhdgj2ryu/image/upload/…it,h_60,w_90/v1631191190/bf8em0vr30mwvmg66ezu.jpg",
          caption: { title: "title images", description: "desc imagdf" },
        },
        id: 1,
        order: 1,
        type: "image",
      },
      {
        content:
          "<h2>The story</h2><p>Insert Your Text Here x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.caption?x.content.captio<strong>n?x.content.caption?x.conten</strong>t.caption?x.content.caption?x.content.caption?x.</p>",
        id: 4,
        order: 2,
        type: "text",
      },
      {
        content: {
          filename: "fainalproject-museumsIntroImage",
          public_id: "bf8em0vr30mwvmg66ezu",
          url: "http://res.cloudinary.com/dhdgj2ryu/image/upload/v1631191190/bf8em0vr30mwvmg66ezu.jpg",
          url_thumb:
            "https://res.cloudinary.com/dhdgj2ryu/image/upload/…it,h_60,w_90/v1631191190/bf8em0vr30mwvmg66ezu.jpg",
          caption: { title: "title images", description: "desc imagdf" },
        },
        id: 1,
        order: 1,
        type: "image",
      },
      {
        content: {
          filename: "fainalproject-museumsIntroImage",
          public_id: "bf8em0vr30mwvmg66ezu",
          url: "http://res.cloudinary.com/dhdgj2ryu/image/upload/v1631191190/bf8em0vr30mwvmg66ezu.jpg",
          url_thumb:
            "https://res.cloudinary.com/dhdgj2ryu/image/upload/…it,h_60,w_90/v1631191190/bf8em0vr30mwvmg66ezu.jpg",
          caption: { title: "title images", description: "desc imagdf" },
        },
        id: 1,
        order: 1,
        type: "image",
      },
    ],
  };

  useEffect(() => {
    // if false therefore is NOT about admin
    if (!isAboutAdmin) {
      return;
    }
    // console.log("props.state.", props.state);
    // setContents(props.state.infoAbout);
    setSection(hardCodedObj);
    setContents(hardCodedObj.contents);
    //eslint-disable-next-line
  }, []);

  console.log("section state", section);
  console.log("contents state", contents);

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
    // console.log("isAddingCover", isAddingCover);
    widget.open();
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

        // if is adding cover true
        if (isAddingCover) {
          const objCoverInfo = {
            filename: x.uploadInfo.original_filename,
            public_id: x.uploadInfo.public_id,
            url: x.uploadInfo.url,
            url_thumb: x.uploadInfo.thumbnail_url,
          };
          // put into section
          section.sectionCover = objCoverInfo;
          // set tot save
          return setNeedsToSave(true);
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
        caption: "",
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
   * @function findBiggestId
   * @desc returns a Number -> biggest existing integer of an "id" from the contents array
   * is aiding the assigning of id's to new contents in function addToContents
   */

  const findBiggestId = (e) => {
    let biggestId = 1;
    contents.forEach((content) => {
      if (content.id > biggestId) {
        biggestId = content.id;
      }
    });
    return biggestId;
  };

  /**
   * @function addToContents
   * @param newContentsArr // newContentsArr to add
   * @desc adds a content into the state "contents" that will be mapped
   */
  const addToContents = (newContentsArr) => {
    // add ids
    // create "id" based on the contents already into the array,
    // from the biggestId present on
    // if [contents] s empty assigns the index

    const bigId = findBiggestId();

    newContentsArr.forEach((content, i) => {
      if (contents.length === 0) {
        content["id"] = i + 1;
        content["order"] = i + 1;
      } else {
        // find the content with the biggest id
        const lastContent = contents.find((content) => content.id === bigId);

        content["id"] = lastContent.id + i + 1;
        content["order"] = contents[contents.length - 1].order + i + 1;
      }
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
    console.log("addMediaCaption", id, caption);
    contents.forEach((x) => {
      if (x.id === id) {
        console.log("adding");
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
   * @desc for the text field to update / ! important updates the section description
   * @param id coming from the prop of <ContentBlockText />
   * @param newContent coming from the prop of <ContentBlockText />
   */
  const updateMediaText = (id, newContent) => {
    // check if the text comes from the description
    // just to update the event description
    if (id === objSectionDecription.id) {
      // assign it to section
      section.description = newContent;
    }
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

    const findIndex = event.sections.findIndex((x) => x.id === id);
    // 3. replace with the new section with splice
    event.sections.splice(findIndex, 1, newSection);
    // 4. dispatch event update

    try {
      await dispatch(eventUpdate(event));
      // set to save
      setNeedsToSave(false);
    } catch (error) {
      console.log(error);
    }
  };

  // * Listener to avoid the user to go back without saving
  unBlock(needsToSave, history);

  // * Functions for the Drag and Re-order of <EventSection/>s

  /**
   * @function handleDrag
   * @desc gets the id of the Section which is being dragged
   * * is passed into the <Child />
   */

  const handleDrag = (e) => {
    // IMPORTANT
    // e.currentTarget.id needs to be parsed otherwise later in handleDrop FUNC, "===" will not work since types are Num and String -> after parsing will be: Num === Num
    setDragId(parseInt(e.currentTarget.id));
  };

  /**
   * @function handleDrop
   * @desc handles the drop and drag function, using content's keys "id" and "order", which by default are the same once the content is created
   * * * is passed into the <Child />
   */

  const handleDrop = (e) => {
    console.log("contents", contents);
    console.log("dragID", dragId);

    // * Finding the drag content with the same id as the one the user is trying to drag from
    const dragContent = contents.find((content) => {
      console.log(typeof content.id, typeof dragId, content.id === dragId);
      return content.id === dragId;
    });

    console.log("content to drag:", dragContent);

    // * Finding the drop content with the same id as the one the user is trying to drop at
    const dropContent = contents.find(
      // parsing again because section.id is a Num and e.currentTarget.id is a String
      (content) => content.id === parseInt(e.currentTarget.id)
    );

    console.log("content to drop:", dropContent);

    // from order x to order y, from one place to another
    const dragContentOrder = dragContent.order; // 1
    const dropContentOrder = dropContent.order; // 2

    console.log("orders:", dragContentOrder, dropContentOrder);

    // setting a new state with the updated order
    const newContentsState = contents.map((content) => {
      if (content.id === dragId) {
        content.order = dropContentOrder;
      }
      if (content.id === parseInt(e.currentTarget.id)) {
        content.order = dragContentOrder;
      }
      return content;
    });

    setContents(newContentsState);
    console.log(newContentsState);
  };

  /**
   * @function addCoverImage
   * @param noParam
   * @desc fires the adding of a cover image
   */

  const addCoverImage = () => {
    // set to true to add the image
    // this will call a condition to set the proper key into obj section
    isAddingCover = true;
    showCloudinaryWidget(cloudinaryWidget);
  };

  // * Objects
  /**
   * @desc obj for the section description
   */
  const objSectionDecription = {
    id: 999999, // important is an reserved id to detect the description
    content: section?.description, // send current description
  };

  // * Hover btn

  return (
    <Container style={{ maxWidth: "720px" }}>
      {/* // * MODAL */}
      {/* For Media Text */}
      <ModalCustom
        content={<TextEditor setText={setMediaText} />}
        isOpen={openModalInsertText}
        // handles the state when the modal is clickes outside the area
        isClose={handleClose}
      />
      {/* For Preview */}
      <ModalCustom
        content={
          <SectionPreview
            contents={contents}
            sectionCover={section.sectionCover}
            sectionDescription={section.description}
            sectionTitle={section.title}
          />
        }
        isOpen={openModalPreview}
        // handles the state when the modal is clickes outside the area
        isClose={handleClose}
      />
      {Object.keys(section).length !== 0 ? (
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} className={classes.gridItem}>
            <h2 className={classes.sectionTitle}>{title}</h2>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            {/* Section cover image */}
            {section.sectionCover.url === "" ? (
              // show button
              // important to upload the cover pass true
              <Button
                onClick={() => {
                  isAddingCover = true;
                  showCloudinaryWidget(cloudinaryWidget);
                }}
              >
                Add a cover Image
              </Button>
            ) : (
              <ImageHoverButton
                title={"Change Cover Image"}
                onClickFunc={addCoverImage}
                image={section.sectionCover}
              />
            )}

            {/* Section description Edit */}
            <ContentBlockText
              isDraggable={false} // to prevent it from being draggable
              item={objSectionDecription}
              // receives the id of the item to delete
              itemToDelete={deleteItem}
              // gets the new content to update
              newContent={updateMediaText}
              // Handle the drag and drop
              handleDrag={handleDrag}
              handleDrop={handleDrop}
            />
          </Grid>

          <Grid item xs={3} className={classes.btnSidebar}>
            {/* // * Buttons Top container */}
            <CustomButton
              style={{ marginBottom: "1rem" }}
              startIcon="arrowBack"
              text="Event"
              onClickFunc={() => goBackToPage(needsToSave, history)}
            />{" "}
            <CustomIconButton
              style={{
                marginBottom: "1rem",
                borderRadius: "8px",
                backgroundColor: !needsToSave ? "inherit" : "#26b519",
              }}
              // make a focus light so the user knows to save

              icon="save"
              onClickFunc={saveContent}
              disabled={!needsToSave}
            />
            {/* // * Buttons Top container */}
            <div className={classes.btnGroup}>
              <CustomButton
                text="text"
                endIcon="add"
                onClickFunc={() => handleOpen("insertText")}
              />
              {/* // ordinary upload with cloudinaryWidget param */}
              <CustomButton
                text="media"
                endIcon="add"
                onClickFunc={() => showCloudinaryWidget(cloudinaryWidget)}
              />
              <CustomButton
                text="qrCode"
                endIcon="add"
                onClickFunc={() => addToContents(createObj("qrcode"))}
              />
            </div>
            <ToggleButton
              value="preview"
              selected={toggleSelected}
              onChange={() => {
                setToggleSelected(!toggleSelected);
              }}
              onClick={() => handleOpen("preview")}
            >
              Preview
            </ToggleButton>
          </Grid>

          {/* // ? Contents container */}
          {/* // ? Add content */}
          <Grid item xs={9} className={classes.gridContent}>
            <h3 className={classes.gridContentHeader}>Contents</h3>
            {/* // ? map contents state */}
            {!contents
              ? null
              : contents
                  .sort((a, b) => a.order - b.order)
                  .map((x, i) => {
                    if (x.type === "text") {
                      return (
                        <ContentBlockText
                          isDraggable={true}
                          item={x}
                          key={x.id}
                          // receives the id of the item to delete
                          itemToDelete={deleteItem}
                          // gets the new content to update
                          newContent={updateMediaText}
                          // Handle the drag and drop
                          handleDrag={handleDrag}
                          handleDrop={handleDrop}
                        />
                      );
                    }
                    return (
                      <ContentBlockMedia
                        isDraggable={true}
                        item={x}
                        key={x.id}
                        // receives the id of the item to delete
                        itemToDelete={deleteItem}
                        mediaCaption={addMediaCaption}
                        // Handle the drag and drop
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                      />
                    );
                  })}
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
}
