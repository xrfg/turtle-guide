/**
 * @desc Hook to retrive an event and save it into redux
 */

import { useEffect, useState } from "react";
import axios from "axios";

const useGetAndSaveEvent = (props) => {
  // Destruc
  const eventName = props;

  const baseURL = "http://localhost:5000/api/events/";

  // * states
  const [event, setEvent] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const getEvent = async () => {
    //     setLoading(true);
    try {
      const eventData = await axios.get(baseURL + eventName);
      console.log("eventData", eventData);
      setEvent(eventData.data);
      //       setLoading(false);
    } catch (err) {
      console.log(err);
      //       setLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
    //eslint-disable-next-line
  }, []);

  return event;
};

export default useGetAndSaveEvent;
