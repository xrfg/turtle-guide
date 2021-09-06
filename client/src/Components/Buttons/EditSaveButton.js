import React from "react";

// * material UI imports Components
import { Button } from "@material-ui/core";
// * material UI imports Icons
import { Edit, Save } from "@material-ui/icons";

export default function EditSaveButton(props) {
  // * Functions
  // changes the editStatus from
  // "editing" true to "non-editing" false
  const { title, isFirstEditing } = props;

  // console.log("EditSaveButton", title, isFirstEditing);
  const handleSaveEditBtn = (e) => {
    // if (title === "Title" || title === "title" || title === "") {
    //   return props.errorMsg("This is not a valid title");
    // } else
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
      // disabled={title === "Title" || isFirstEditing ? true : false}
    >
      {props.editStatus ? <Save /> : <Edit />}
    </Button>
  );
}
