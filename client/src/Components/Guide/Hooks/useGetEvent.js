/**
 * @desc hook to get the current event
 */

// * Redux
import { useSelector } from "react-redux";

const useGetEvent = () => {
  // * Hooks
  // get eventGuide state in redux
  const event = useSelector((state) => state.events.eventGuide);

  // if event is === {} (empty)
  // if is called directly from <Section />
  if (Object.keys(event).length === 0) {
    return null;
  }

  // TODO insert error in case of wrong section
  // return
  return event;
};

export default useGetEvent;
