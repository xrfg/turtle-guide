/**
 * @desc Component to handle the contents into the Section
 */

import React from "react";

// * Imports
import SectionContentManager from "../../Components/SectionContentManager/SectionContentManager";
import Spinner from "../../Components/Spinner/Spinner";

// * Redux
import { useSelector } from "react-redux";

const AboutAdmin = (props) => {
  // * Hooks
  const userInfo = useSelector((state) => state.user.userProfile);

  return (
    <>
      {!userInfo ? (
        Spinner
      ) : (
        // state null to use it as about admin manager
        <SectionContentManager
          state={{
            id: 100000,
            title: "title",
            slug: "slug",
            nameIdentifier: "nameIdentifier",
          }}
          fetchedData={userInfo}
          isAboutAdmin={true} // if true edits the admin infos
        />
      )}
    </>
  );
};

export default AboutAdmin;
