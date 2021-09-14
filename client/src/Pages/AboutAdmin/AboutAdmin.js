/**
 * @desc Component to handle the contents into the Section
 */

import React, { useState, useEffect } from "react";

// * Imports
import SectionContentManager from "../../Components/SectionContentManager/SectionContentManager";
import Spinner from "../../Components/Spinner/Spinner";

// * Redux
import { useDispatch } from "react-redux";
import { userFecth } from "../../store/actions/userActions";
const AboutAdmin = (props) => {
  // destru
  const { sectionId, eventNameIdentifier } = props;
  // * Hooks
  const dispatch = useDispatch();
  // * States
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // fetch data
      const res = await dispatch(userFecth());
      // set in state
      setUserInfo(res);
    }

    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!userInfo ? (
        Spinner
      ) : (
        <SectionContentManager state={userInfo} isAboutAdmin={true} />
      )}
    </>
  );
};

export default AboutAdmin;
