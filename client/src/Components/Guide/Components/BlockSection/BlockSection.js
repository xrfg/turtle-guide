/**
 * @desc Components that renders the blocks of sections into <Home />
 */

import React from "react";
import { useHistory } from "react-router-dom";
// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

// * MAT UI
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// * Imports
import { goToSection } from "../../Functions/functions";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 450,
    height: 385, // must be fixed
    margin: "0 0 4rem 0",
    width: "80%",
  },
  cardContent: {
    margin: "0 0 0 0",
    padding: "1rem 1rem 0rem 1rem",
    // backgroundColor: ourColors.lightGrey,
  },
  cardTitle: {
    margin: "0 0 0 0",
    color: "#424242",
    ...theme.guide.header,
  },
  cardDesc: {
    // fontSize: "2rem",
    margin: "0 0 0 -15px",
    // width: "150px",
    // whiteSpace: "nowrap",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // wordWrap: "break-word",
  },

  media: {
    margin: "0",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const BlockSection = (props) => {
  // * HOOKS
  const classes = useStyles();
  let history = useHistory();

  // destruc
  const { eventSlug, nameIdentifier, sectionIndex } = props;
  const { title, description, id, order } = props.data;

  return (
    <Card
      className={classes.card}
      maxWidth="lg"
      onClick={() =>
        goToSection(history, id, order, sectionIndex, eventSlug, nameIdentifier)
      }
      // onClick={goToSection}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.data.sectionCover.url}
          title={props.data.sectionCover.filename}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.cardTitle}
            gutterBottom
            variant="h2"
            component="h2"
          >
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            <ReactQuill
              className={classes.cardDesc}
              value={
                description.substring(0, 100).length > 99
                  ? description.substring(0, 100) + "..."
                  : description.substring(0, 100)
              }
              readOnly={true}
              theme={"bubble"}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default BlockSection;
