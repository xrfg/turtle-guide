/**
 * @desc Hook to get the current event to render
 */

// * Redux
import { useSelector } from "react-redux";

const useEventReducer = (props) => {
  // * Hooks
  // get eventGuide state in redux
  const event = useSelector((state) => state.events.eventGuide);

  // console.log("events", events);

  // if event is === {} (empty)
  if (Object.keys(event).length === 0) {
    return null;
  }

  // event tto find
  const idSection = props;

  // get event
  const findSection = event.sections.find((x) => x.id === idSection);
  // return
  return findSection;
};

export default useEventReducer;
