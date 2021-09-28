/**
 * @desc Component that returns a Spinner for the admin
 */

import React, { useState } from "react";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { ourColors } from "../../styles/Theme";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: ${ourColors.indigoDye};
`;

const Spinner = () => {
  let [loading] = useState(true);
  let [color] = useState(`${ourColors.indigoDye}`);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      <ClipLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
};

export default Spinner;
