import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import baseURL from "../../../../config/baseURL";

export default function Event() {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState();
  let { id } = useParams();

  const getEvent = async () => {
    setLoading(true);
    try {
      const eventData = await axios.get(baseURL + "/events/" + id);
      setEvent(eventData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //geting the Event's data only once
  useEffect(() => {
    getEvent();
    //eslint-disable-next-line
  }, []);

  return <div>im an exhibition</div>;
}
