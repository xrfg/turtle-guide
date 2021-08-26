// TODO Save the inputs onChange on save
// TODO Add Delete BTN
// TODO Add Drag and Rearrange BTN

// TODO Handle the Pay-wall
// TODO Handle the Pay-wall
// TODO Handle the Feedback
// TODO Handle the Map

import React, { useState } from "react";

// * material UI imports Components
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  ButtonGroup,
  TextField,
  Box,
  makeStyles,
} from "@material-ui/core";
// * material UI imports Icons
import { Forward } from "@material-ui/icons";

// * React Components
import EditSaveButton from "../../Components/Buttons/EditSaveButton";

const useStyles = makeStyles((theme) => ({
  card: { position: "relative", marginBottom: "1rem" },
  card__title: {},
  card__desc: {},
  forwardIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  textField: { display: "block" },
}));
export default function EventSection(props) {
  const classes = useStyles(props);
  // * States
  const [editing, setEditing] = useState(false);

  // * goes into button child component and gets info back wether editing is toggled or not
  const handleSaveEditBtn = (val) => {
    if (val) {
      setEditing(true);
      console.log("editing");
    } else {
      setEditing(false);
      console.log("editing closed");
    }
  };

  return (
    <div>
      <Card className={classes.card} key={props.key}>
        <CardContent>
          {editing ? (
            <Box>
              <TextField
                id="eventName"
                type="text"
                className={classes.textField}
                defaultValue=""
                placeholder="Title"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => console.log("imok")}
              />
              <TextField
                id="eventName"
                type="text"
                className={classes.textField}
                fullWidth
                defaultValue=""
                placeholder="Description"
                multiline={true}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => console.log("imok")}
              />
            </Box>
          ) : (
            <Box>
              <Typography
                className={classes.card__title}
                variant="h6"
                component="h6"
              >
                {props.section.title}
              </Typography>
              <Typography
                className={classes.card__desc}
                variant="subtitle1"
                component="p"
              >
                {props.section.description}
              </Typography>{" "}
            </Box>
          )}
        </CardContent>
        <CardActions>
          <ButtonGroup
            orientation="horizontal"
            aria-label="horizontal button group"
          >
            <EditSaveButton
              size={"small"}
              editStatus={editing}
              editHandler={handleSaveEditBtn}
            />
            <Button href={`${props.section.url}`} size="small">
              <Forward />
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </div>
  );
}
