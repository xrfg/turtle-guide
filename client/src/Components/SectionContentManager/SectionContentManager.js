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
  Paper,
  Container,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import PopUpDialogBox from "../../Components/PopUpDialogBox/PopUpDialogBox";

// <ModalCustom content={a content} isOpen={state} isClose={function}/>
import ModalCustom from "../../Components/Modal/ModalCustom";

// <SectionPreview />
// requires props "contents" <SectionPreview contents={ }/>
import SectionPreview from "../../Components/SectionPreview/SectionPreview";

// custom buttons
import CustomIconButton from "../Buttons/CustomIconButtons/CustomIconButton";

// * Other Imports
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { eventUpdate } from "../../store/actions/eventsActions";
import { userUpdate } from "../../store/actions/userActions";

// * Functions
import { goBackToPage, unBlock } from "../../functions/functions";
import ImageHoverButton from "../Buttons/ImageHoverButton";
import CustomButton from "../Buttons/CustomButtons/CustomButton";
import { ourColors, ourColorsTwo } from "../../styles/Theme";

const useStyles = makeStyles((theme) =>
  createStyles({
    page: { ...theme.admin.page },
    container: { ...theme.admin.container, paddingTop: "3.4rem" }, // main Admin container class

    coverImg: {},
    accordion: { marginBottom: "2rem" },
    accordTxtField: { marginBottom: "0.6rem", marginRight: "0.6rem" },
    eventHeaderTab: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    // Custom margins container buttons
    pageTitleContainer: { ...theme.admin.pageTitleContainer },
    pageTitle: {
      ...theme.admin.pageTitle,
      fontSize: "1.6rem",
    },
    contentsContainer: {
      ...theme.admin.sectionsContentsContainer,
    },
    btnSidebar: {
      ...theme.admin.btnSidebar,
    },
    btnGroup: {
      ...theme.admin.btnGroup,
    },
    togglePreviewBtn: {
      backgroundColor: ourColors.lightGrey,
      border: `1px solid ${ourColors.ming}`,
      color: ourColors.ming,
      fontWeight: "bold",
      transition: "all 0.2s",
      "&:hover": {
        backgroundColor: ourColors.ming,
        color: ourColors.lightGrey,
      },
      "&:selected": { backgroundColor: "black" },
    },
    gridContentHeader: { ...theme.admin.gridContentHeader },
  })
);

export default function SectionContentManager(props) {
  // * Destruc
  const {
    state: { id, title, slug, nameIdentifier },
  } = props;

  const {
    // if true edits the admin infos
    isAboutAdmin = false,
    fetchedData,
  } = props;

  // * Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const events = useSelector((state) => state.events.events);
  const token = useSelector((state) => state.user.token);

  // * States

  // loading state
  const [loading, setLoading] = useState(true);
  // state that contains all the contents
  const [contents, setContents] = useState([]);
  // event
  const [event, setEvent] = useState({});
  // section
  const [section, setSection] = useState({});
  // section userinfo for about admin
  const [userInfo, setUserInfo] = useState({});
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [subscriptionDate, setSubscriptionDate] = useState("");

  // is intro state
  // if id === 1 sets to true
  const [isIntro, setIsIntro] = useState(false);

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
  // for delete confirmation
  const [openDeleteDialogBox, setOpenDeleteDialogBox] = useState(false);
  // set the id to delete
  const [idToDelete, setIdToDelete] = useState(100000);
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
    // if id === 1 sets to true
    if (id === 1) {
      setIsIntro(true);
    }

    // find the event
    const getEvent = events.find((x) => x.nameIdentifier === nameIdentifier);
    // set the event to be modified and sent for saving
    setEvent(getEvent);

    // get the section with the id
    const getSection = getEvent.sections.find((x) => x.id === id);
    setSection(getSection);
    setContents(getSection.contents);

    // set loading to false
    setLoading(false);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if false therefore is NOT about admin
    if (!isAboutAdmin) {
      return;
    }

    console.log("useEf fetchedData", fetchedData);
    // section is into infoAbout
    setUserInfo(fetchedData);
    setSection(fetchedData?.infoAbout);
    if (fetchedData?.infoAbout?.contents) {
      setContents(fetchedData.infoAbout.contents);
    }

    // create date
    const date = new Date(fetchedData.date);

    const dateToString = date.toString();

    const findCut = dateToString.search(":");

    setSubscriptionDate(dateToString.substring(0, findCut - 3));

    // set loading to false
    setLoading(false);

    //eslint-disable-next-line
  }, []);

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
  const deleteItem = (val) => {
    // if a true value is return from the props confrim in <PopUpDi... />
    if (val) {
      // IMPORTANT
      //  filter returns an array so updates the contents
      const newContents = contents.filter((x) => x.id !== idToDelete);
      // set new content
      setContents(newContents);
      // set to save
      setNeedsToSave(true);
      // toggle dialog
      toggleDeleteDialogBox();
    }
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
   *
   */

  const saveContent = async () => {
    if (isAboutAdmin) {
      try {
        // create obj to save
        const objToSave = {
          ...fetchedData,
          ...userInfo,
          infoAbout: {
            sectionCover: section.sectionCover,
            contents: contents,
          },
        };

        const res = await dispatch(
          userUpdate({ user: objToSave, token: token })
        );
        // set to save
        if (res.success === true) {
          return setNeedsToSave(false);
        }
      } catch (error) {
        return console.log(error);
      }
    }

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
      await dispatch(eventUpdate({ event: event, token: token }));
      // set to save
      return setNeedsToSave(false);
    } catch (error) {
      return console.log(error);
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
    // * Finding the drag content with the same id as the one the user is trying to drag from
    const dragContent = contents.find((content) => {
      return content.id === dragId;
    });

    // * Finding the drop content with the same id as the one the user is trying to drop at
    const dropContent = contents.find(
      // parsing again because section.id is a Num and e.currentTarget.id is a String
      (content) => content.id === parseInt(e.currentTarget.id)
    );

    // from order x to order y, from one place to another
    const dragContentOrder = dragContent.order; // 1
    const dropContentOrder = dropContent.order; // 2

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

  /**
   * @function editUserInfo
   * @desc handles the editing user info when is in about admin
   */

  const editUserInfo = () => {
    // if is already in editng mode it saves
    if (isEditingUserInfo) {
      console.log("save editing use rinfo");
      saveContent();
    }
    // set editing
    setIsEditingUserInfo((prev) => !prev);
  };

  /**
   * @function handleUserInfoChange
   * @desc set user info obj
   */

  const handleUserInfoChange = (e) => {
    setNeedsToSave(true);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  /**
   * @function toggleDeleteDialogBox
   * @desc handle popup dialog box and set the id to delete
   */

  const toggleDeleteDialogBox = (id) => {
    // set the id of the item to delete
    setIdToDelete(id);
    setOpenDeleteDialogBox((prev) => !prev);
  };

  // * Objects
  /**
   * @desc obj for the section description
   */
  const objSectionDecription = {
    id: 999999, // important is an reserved id to detect the description
    content: section?.description, // send current description
  };

  console.log("Object.keys(userInfo).length", userInfo);

  return (
    <div className={classes.page}>
      <Container maxWidth="md" className={classes.container}>
        {/* // * MODAL */}
        {/* content Delete confirmation */}
        {contents.length === 0 && loading ? null : (
          <>
            <PopUpDialogBox
              open={openDeleteDialogBox}
              isClose={toggleDeleteDialogBox}
              confirm={deleteItem}
              confirmButtonTitle="Delete Media Content"
              messageTitle={`Are you sure you want to delete this content?`}
              messageBody="Deleting a content will permanently erase it from the section."
            />
            {/* For Media Text */}
            <ModalCustom
              title={section?.title}
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
                  sectionCover={section?.sectionCover}
                  sectionDescription={section?.description}
                  pageTitle={section?.title}
                />
              }
              isOpen={openModalPreview}
              // handles the state when the modal is clickes outside the area
              isClose={handleClose}
            />
          </>
        )}
        {Object.keys(userInfo).length !== 0 ? (
          <>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Account information{" "}
                  <span style={{ fontSize: "0.8rem", marginLeft: "0.4rem" }}>
                    (hidden from the visitors)
                  </span>
                </Typography>
              </AccordionSummary>
              <Grid container spacing={1}>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        className={classes.accordTxtField}
                        disabled={isEditingUserInfo ? false : true}
                        id="standard-read-only-input"
                        label="Account"
                        name="accountName"
                        onChange={handleUserInfoChange}
                        defaultValue={userInfo.accountName}
                      />
                      <TextField
                        className={classes.accordTxtField}
                        disabled={isEditingUserInfo ? false : true}
                        id="standard-read-only-input"
                        label="Company"
                        name="company"
                        onChange={handleUserInfoChange}
                        defaultValue={userInfo.company}
                      />
                      <TextField
                        className={classes.accordTxtField}
                        disabled={isEditingUserInfo ? false : true}
                        id="standard-read-only-input"
                        label="Name"
                        name="firstName"
                        onChange={handleUserInfoChange}
                        defaultValue={userInfo.firstName}
                      />
                      <TextField
                        className={classes.accordTxtField}
                        disabled={isEditingUserInfo ? false : true}
                        id="standard-read-only-input"
                        label="Lastname"
                        name="lastName"
                        onChange={handleUserInfoChange}
                        defaultValue={userInfo.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        className={classes.accordTxtField}
                        disabled={true}
                        id="standard-read-only-input"
                        label="Subscribed on"
                        defaultValue={subscriptionDate}
                      />
                      <TextField
                        className={classes.accordTxtField}
                        disabled={isEditingUserInfo ? false : true}
                        id="standard-read-only-input"
                        label="Email"
                        name="email"
                        onChange={handleUserInfoChange}
                        defaultValue={userInfo.email}
                      />
                      <TextField
                        className={classes.accordTxtField}
                        disabled={true}
                        id="standard-read-only-input"
                        label="Your Plan"
                        defaultValue={userInfo.plan}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/*  //  editing info */}
                      <CustomIconButton
                        icon={isEditingUserInfo ? "save" : "edit"}
                        onClickFunc={editUserInfo}
                        style={{
                          marginBottom: "1rem",
                          borderRadius: "8px",
                          backgroundColor: !needsToSave ? "inherit" : "#26b519",
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Grid>
            </Accordion>
          </>
        ) : null}

        {Object.keys(section).length !== 0 ? (
          <Grid container direction="row" /* spacing={2} */>
            {/* // * Do not render title if is about admin */}
            {userInfo.company ? (
              <Grid xs={12} className={classes.pageTitleContainer}>
                <Typography className={classes.pageTitle}>
                  {userInfo.company}
                </Typography>
              </Grid>
            ) : (
              <Grid container className={classes.eventHeaderTab}>
                <Grid xs={9} className={classes.pageTitleContainer}>
                  <Typography className={classes.pageTitle}>{title}</Typography>
                </Grid>
                <Grid xs={2}>
                  <CustomButton
                    startIcon="arrowBack"
                    text={isAboutAdmin ? "Back" : "Event"}
                    onClickFunc={() => goBackToPage(needsToSave, history)}
                    style={{ width: "100%", marginTop: "-1rem" }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              className={`${classes.gridItem} ${classes.coverImg}`}
            >
              {/* Section cover image */}
              {section.sectionCover?.url === "" ? (
                // show button
                // important to upload the cover pass true
                <CustomButton
                  style={{
                    transform: "translate(0,-1.4rem)",
                    marginBottom: "0.6rem",
                  }}
                  onClickFunc={() => {
                    isAddingCover = true;
                    showCloudinaryWidget(cloudinaryWidget);
                  }}
                  // if intro changes title
                  text={isIntro ? "Background Image" : "Cover Image"}
                  endIcon="add"
                />
              ) : (
                <ImageHoverButton
                  title={"Change Cover Image"}
                  onClickFunc={addCoverImage}
                  image={section.sectionCover}
                />
              )}

              {/* // * set gradient */}

              {/* If is editing admin */}
              {/* If is editing about admin do not show */}
              {!isAboutAdmin && (
                <>
                  {/* Section description Edit */}
                  <ContentBlockText
                    isDraggable={false} // to prevent it from being draggable
                    item={objSectionDecription}
                    // receives the id of the item to delete
                    itemToDelete={toggleDeleteDialogBox}
                    // gets the new content to update
                    newContent={updateMediaText}
                    // Handle the drag and drop
                    handleDrag={handleDrag}
                    handleDrop={handleDrop}
                  />
                </>
              )}
            </Grid>
            {/* // * Header */}
            <Grid item xs={3}></Grid> {/* ! empty for styling purposes */}
            <Grid item xs={9}>
              <h3 className={classes.gridContentHeader}>
                {toggleSelected ? "Preview" : "Contents"}
              </h3>
            </Grid>
            {/* // * Buttons Top container */}
            <Grid /* item */ xs={3} className={classes.btnSidebar}>
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
                {/* <CustomButton
                  text="qrCode"
                  endIcon="add"
                  onClickFunc={() => addToContents(createObj("qrcode"))}
                /> */}
              </div>
              <CustomIconButton
                style={{
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  backgroundColor: !needsToSave ? "#A1FF84" : "#26b519",
                }}
                // make a focus light so the user knows to save

                icon="save"
                onClickFunc={saveContent}
                disabled={!needsToSave}
              />
              <ToggleButton
                className={classes.togglePreviewBtn}
                value="preview"
                selected={toggleSelected}
                onChange={() => {
                  setToggleSelected(!toggleSelected);
                  // makes btn filled or empty (grey), also activates the toggle "Contents" or "Preview"
                }}
                /* onClick={() => handleOpen("preview")} */
              >
                {toggleSelected ? "Edit" : "Preview"}
              </ToggleButton>
            </Grid>
            {/* if toggleSelected */}
            <Grid
              xs={9}
              className={classes.contentsContainer}
              /* style={{ padding: "0" }} */
            >
              {toggleSelected ? (
                <SectionPreview
                  id={id}
                  adminPreview={true}
                  contents={contents}
                  sectionCover={section?.sectionCover}
                  sectionDescription={section?.description}
                  pageTitle={section?.title}
                />
              ) : (
                contents
                  .sort((a, b) => a.order - b.order)
                  .map((x, i) => {
                    if (x.type === "text") {
                      return (
                        <ContentBlockText
                          isDraggable={true}
                          item={x}
                          key={x.id}
                          // receives the id of the item to delete
                          itemToDelete={toggleDeleteDialogBox}
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
                        itemToDelete={toggleDeleteDialogBox}
                        mediaCaption={addMediaCaption}
                        // Handle the drag and drop
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                      />
                    );
                  })
              )}
            </Grid>
          </Grid>
        ) : null}
      </Container>
    </div>
  );
}
