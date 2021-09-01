import React from "react";

// * material UI imports Components
import { Button } from "@material-ui/core";
// * material UI imports Icons
import { Edit, Save } from "@material-ui/icons";

export default function EditSaveButton(props) {
  // * Functions
  // changes the editStatus from
  // "editing" true to "non-editing" false

  const handleSaveEditBtn = (e) => {
    if (props.editStatus === false) {
      props.editHandler((prev) => !prev);
    } else {
      props.editHandler(false);
    }
  };

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        handleSaveEditBtn();
      }}
    >
      {props.editStatus ? <Save /> : <Edit />}
    </Button>
  );
}
