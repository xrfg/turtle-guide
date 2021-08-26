/**
 * @desc Conmponent that creates a content block
 * into the blocks it can be edited and deleted
 * @param props item
 */

import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// * Mat UI
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";

// * Icons
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
    },
    paper: {
      marginTop: "10px",
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

const ContentBlock = (props) => {
  const classes = useStyles();

  // destructuring
  let {
    id,
    type,
    content: { url, url_thumb },
  } = props.item;

  return (
    <Paper className={classes.paper} key={id}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            {/* // * Sets icon if the file is audio */}
            {type === "audio" ? (
              <PlayCircleOutlineIcon fontSize="large" />
            ) : (
              <img className={classes.img} alt="complex" src={url_thumb} />
            )}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {/* {title} {type} */}
                {type}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {/* {text} */}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* {id} */}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                <DeleteIcon fontSize="small" />
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1"></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  // return (
  //   <Card className={classes.root}>
  //     <CardActionArea>
  //       <CardMedia
  //         className={classes.media}
  //         image="/static/images/cards/contemplative-reptile.jpg"
  //         title="Contemplative Reptile"
  //       />
  //       <CardContent>
  //         <Typography gutterBottom variant="h5" component="h2">
  //           {title}
  //         </Typography>
  //         <Typography variant="body2" color="textSecondary" component="p">
  //           {text}
  //         </Typography>
  //       </CardContent>
  //     </CardActionArea>
  //     <CardActions>
  //       <Button size="small" color="primary">
  //         Share
  //       </Button>
  //       <Button size="small" color="primary">
  //         Learn More
  //       </Button>
  //     </CardActions>
  //   </Card>
  // );
};

export default ContentBlock;
