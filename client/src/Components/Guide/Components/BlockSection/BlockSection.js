/**
 * @desc Components that renders the blocks of sections into <Home />
 */

import React from "react";
import { useHistory } from "react-router-dom";
// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

// * MAT UI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

// * Imports
import { goToSection } from "../../Functions/functions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
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

  // console.log("BlockSection nameIdentifier ", nameIdentifier);
  console.log("props.data", props.data);

  // const goToSection = () => {
  //   history.push(`sections/${id}`, {
  //     eventSlug: eventSlug,
  //     nameIdentifier: nameIdentifier,
  //     id: id,
  //     // order: order,
  //   });
  // };

  return (
    <Card
      className={classes.root}
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <ReactQuill value={description} readOnly={true} theme={"bubble"} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default BlockSection;
