/**
 * @desc Component for messagges error/success
 */

import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

// takes props <CustomMessage severity = { severity } > { msg } />
// severity: "error", "success", "warning", "info"
// msg: "Message"
// time: 3000 // optional
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
