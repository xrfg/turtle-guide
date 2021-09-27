/**
 * @desc is a Custom Button Component using our Custom Icon Button Component
 *
 */

import React from "react";

// Custom Component Imports
import CustomIconButton from "./CustomIconButtons/CustomIconButton";

export default function EditSaveButton(props) {
  // * Functions

  const handleSaveEditBtn = (e) => {
    e.stopPropagation(); // makes it unable to trigger the forwarding link

    if (props.editStatus === false) {
      props.editHandler((prev) => !prev);
    } else {
      props.editHandler(false);
    }
  };

  return (
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
