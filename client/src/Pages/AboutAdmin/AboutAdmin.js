/**
 * @desc Component to handle the contents into the Section
 */

import React, { useState, useEffect } from "react";

// * Imports
import SectionContentManager from "../../Components/SectionContentManager/SectionContentManager";

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
      const res = await dispatch(userFecth());
      setUserInfo(res);
    }

    fetchData();

    // eslint-disable-next-line
  }, []);

  console.log("userInfo", userInfo);

  return null;
  // <SectionContentManager
  //   eventNameIdentifier={eventNameIdentifier}
  //   sectionId={sectionId}
  // />
};

export default AboutAdmin;
