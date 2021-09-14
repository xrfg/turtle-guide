/**
 * @desc Button to use in Image hover
 */

import React from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 300,
      width: "100%",
    },
    image: {
      position: "relative",
      height: 200,
      [theme.breakpoints.down("xs")]: {
        width: "100% !important", // Overrides inline-style
        height: 100,
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.4,
        },
        "& $imageMarked": {
          opacity: 0,
        },
        "& $imageTitle": {
          visibility: "visible", // show title on hover
          // border: "4px solid currentColor",
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0,
      transition: theme.transitions.create("opacity"),
    },
    imageTitle: {
      visibility: "hidden", // show title on hover
      position: "relative",
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
        theme.spacing(1) + 6
      }px`,
    },
    imageMarked: {
      // height: 3,
      // width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity"),
    },
  })
);

const ImageHoverButton = (props) => {
  // * Hooks
  const classes = useStyles();

  // destruc
  const { onClickFunc, image, title } = props;

  return (
    <ButtonBase
      focusRipple
      key={image.filename}
      className={classes.image}
      focusVisibleClassName={classes.focusVisible}
      style={{
        width: "900px", // ! decide the size of the cover
      }}
      onClick={onClickFunc}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${image.url})`,
        }}
      />
      <span className={classes.imageBackdrop} />
      <span className={classes.imageButton}>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className={classes.imageTitle}
        >
          {title}
          <span className={classes.imageMarked} />
        </Typography>
      </span>
    </ButtonBase>
  );
};

export default ImageHoverButton;
