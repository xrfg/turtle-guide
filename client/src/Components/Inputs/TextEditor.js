/**
 * @desc Component that returns a WYSIWYG Editor
 *  <DefaultEditor /> is into a component to avoid re-renders
 */

import React, { useState, useCallback } from "react";

// * Mat UI
import { Button } from "@material-ui/core";

// * Components
import { DefaultEditor } from "react-simple-wysiwyg";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const TextEditor = (props) => {
  const { content } = props;

  // state into function
  const [html, setHtml] = useState(content || "Insert Your Text Here");

  // onChange does not sent to parent
  // updates just the function
  // useCallback to avoid re.renders
  const onChange = useCallback(
    (e) => {
      setHtml(e);
    },
    // eslint-disable-next-line
    [html]
  );

  // send data to the parent through props
  const sendTextToParent = () => {
    props.setText(html);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    // mention: {
    //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    //   mentionDenotationChars: ["@", "#"],
    //   source: function (searchTerm, renderItem, mentionChar) {
    //     let values;
    //     if (mentionChar === "@" || mentionChar === "#") {
    //       values = atValues;
    //     }
    //     if (searchTerm.length === 0) {
    //       renderItem(values, searchTerm);
    //     } else {
    //       const matches = [];
    //       for (let i = 0; i < values.length; i++)
    //         if (
    //           ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
    //         )
    //           matches.push(values[i]);
    //       renderItem(matches, searchTerm);
    //     }
    //   },
    // },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "mention",
  ];

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={html}
        onChange={onChange}
      />
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
