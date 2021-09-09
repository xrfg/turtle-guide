/**
 * @desc Hook to retrive an event and save it into redux
 */

import { useEffect, useState } from "react";
import axios from "axios";

// * Redux
import { useDispatch } from "react-redux";
import { setEventGuide } from "../../../store/actions/eventsActions";

/**
 * @param eventName // event to get and set
 * @param val if need to be stopped or not i.e. false DO NOT STOP
 * @desc the param val is used into <Section /> in case the page is called
 * directly without passing by <Guide/> or <Home/>
 */
const useGetAndSaveEvent = (eventName, val = false) => {
  // * Hooks
  const dispatch = useDispatch();
  // * states
  const [event, setEvent] = useState(null);

  // * base url
  // TODO change it
  const baseURL = "http://localhost:5000/api/events/";

  const getEvent = async () => {
    try {
      const eventData = await axios.get(baseURL + eventName);
      // set state
      await setEvent(eventData.data.data);
      // dispatch
      await dispatch(setEventGuide(eventData.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // if val is false stops the process
    if (!val || val === null) {
      return getEvent();
    } else {
      return;
    }
    //eslint-disable-next-line
  }, []);

  return event;
};

export default useGetAndSaveEvent;
