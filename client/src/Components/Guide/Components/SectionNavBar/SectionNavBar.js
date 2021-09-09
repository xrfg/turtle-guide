/**
* @desc Component for the top section of the sections 
to navigate through them 
*/

import React from "react";

const SectionNavBar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "15px" }}>
      <button style={{ padding: "5px" }}>Prev</button>
      <h4 style={{ padding: "5px" }}>Title</h4>
      <button style={{ padding: "5px" }}>Next</button>
    </div>
  );
};

export default SectionNavBar;
