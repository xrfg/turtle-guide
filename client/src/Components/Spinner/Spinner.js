/**
 * @desc Component that returns a Spinner for the admin
 */

import React, { useState } from "react";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  let [loading] = useState(true);
  let [color] = useState("red");

  return (
    <ClipLoader color={color} loading={loading} css={override} size={150} />
  );
};

export default Spinner;
