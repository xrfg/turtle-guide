import React from "react";

// * material UI imports Components
import { Button } from "@material-ui/core";
// * material UI imports Icons
import { Edit, Save } from "@material-ui/icons";

export default function EditSaveButton(props) {
  // * Functions

  // * changes the editStatus from "editing" true to "non-editing" false
  const handleSaveEditBtn = (e) => {
    if (props.editStatus === false) {
      props.editHandler(true);
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
      type={props.editStatus ? "submit" : "text"}
      // type is not really working as it should, i.e: not submitting if we click on Edit icon
    >
      {props.editStatus ? <Save /> : <Edit />}
    </Button>
  );
}
