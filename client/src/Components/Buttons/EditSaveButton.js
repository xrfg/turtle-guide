/**
 * @desc is a Custom Button Component using our Custom Icon Button Component
 *
 */

import React from "react";

// Custom Component Imports
import CustomIconButton from "./CustomIconButtons/CustomIconButton";

export default function EditSaveButton(props) {
  // * Functions
  // changes the editStatus from
  // "editing" true to "non-editing" false
  const { title, isFirstEditing } = props;

  // console.log("EditSaveButton", title, isFirstEditing);
  const handleSaveEditBtn = (e) => {
    e.stopPropagation(); // makes it unable to trigger the forwarding link
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
    // disabled={title === "Title" || isFirstEditing ? true : false}
    <CustomIconButton
      // make a focus light so the user knows to save
      style={{
        backgroundColor: !props.editStatus ? "inherit" : "#26b519",
        zIndex: "15",
      }}
      icon={props.editStatus ? "save" : "edit"}
      onClickFunc={handleSaveEditBtn}
    />
  );
}
