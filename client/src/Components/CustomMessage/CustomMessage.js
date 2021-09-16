/**
 * @desc Component for messagges error/success
 */

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Alert from "@material-ui/lab/Alert";

import { Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

// * HOWTO
// takes props <CustomMessage open={bool} severity = { severity } > { msg } />
// severity: "error", "success", "warning", "info"
// msg: "Message"
// time: 3000 // optional
const CustomMessage = () => {
  // destru
  // const { open, msg, severity, time = 6000 } = props;

  // console.log("CustomMessage", open);

  // States
  // const [visible, setIsVisible] = useState(open);

  // setTimeout(function () {
  //   setIsVisible(false);
  // }, time);

  // useEffect(() => {
  //   setIsVisible(true);
  // }, []);

  // const handleOnClose = () => {
  //   console.log("close it");
  //   setIsVisible(false);
  // };

  return toast("Success! Check email for details", { type: "success" });
};

export default CustomMessage;
