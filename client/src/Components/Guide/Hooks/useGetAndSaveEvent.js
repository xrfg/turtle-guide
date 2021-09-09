/**
 * @desc Hook to retrive an event and save it into redux
 */

import { useEffect, useState } from "react";
import axios from "axios";

// * Redux
import { useDispatch } from "react-redux";
import { setEventGuide } from "../../../store/actions/eventsActions";

const useGetAndSaveEvent = (props) => {
  // * Hooks
  const dispatch = useDispatch();

  // set event name
  const eventName = props;

  // * base url
  // TODO change it
  const baseURL = "http://localhost:5000/api/events/";

  // * states
  const [event, setEvent] = useState(null);

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
    getEvent();
    //eslint-disable-next-line
  }, []);

  return event;
};

export default useGetAndSaveEvent;
