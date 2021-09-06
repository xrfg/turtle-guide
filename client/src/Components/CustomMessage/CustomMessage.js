/**
 * @desc Component for messagges error/success
 */

import React from "react";
import Alert from "@material-ui/lab/Alert";

const CustomMessage = (props) => {
  /**
   * @function createMessagge
   * @desc Sends messagess back
   */

  const { msg, severity, time = 3000 } = props;
  const createMessage = () => {
    setTimeout(() => {
      return <Alert severity={severity}>{msg}</Alert>;
    }, time);
  };
  //   return createMessage;
  return <Alert severity={severity}>{msg}</Alert>;
};

export default CustomMessage;
