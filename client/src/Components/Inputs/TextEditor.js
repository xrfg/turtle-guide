/**
 * @desc Component that returns a WYSIWYG Editor
 *  <DefaultEditor /> is into a component to avoid re-renders
 */

import React, { useState, useCallback } from "react";

// * Mat UI
import { Button } from "@material-ui/core";
import { DefaultEditor } from "react-simple-wysiwyg";

const TextEditor = (props) => {
  const { content } = props;

  // state into function
  const [html, setHtml] = useState(content || "Insert Your Text Here");

  // onChange does not sent to parent
  // updates just the function
  // useCallback to avoid re.renders
  const onChange = useCallback(
    (e) => {
      setHtml(e.target.value);
    },
    // eslint-disable-next-line
    [html, props.setText]
  );

  // send data to the parent through props
  const sendTextToParent = () => {
    props.setText(html);
  };

  return (
    <>
      <DefaultEditor value={html} onChange={onChange} />

      <Button
        size="small"
        variant="contained"
        color="primary"
        component="span"
        onClick={() => {
          sendTextToParent();
          // handleClose();
        }}
      >
        Close and Insert
      </Button>
    </>
  );
};

export default TextEditor;
