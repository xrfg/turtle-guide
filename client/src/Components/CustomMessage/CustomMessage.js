/**
 * @desc Component for messagges error/success
 */

import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

const CustomMessage = (props) => {
  const [visible, setIsVisible] = useState(true);
  const { msg, severity, time = 3000 } = props;

  setTimeout(function () {
    setIsVisible(false);
  }, time);

  return (
    <div className="custom-message">
      {visible && <Alert severity={severity}>{msg}</Alert>}
    </div>
  );
};

export default CustomMessage;
