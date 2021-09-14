/**
 * @desc Hook to get the current event to render
 */

// * Redux
import { useSelector } from "react-redux";

const useEventSection = (props) => {
  // * Hooks
  // get eventGuide state in redux
  const event = useSelector((state) => state.events.eventGuide);

  // if event is === {} (empty)
  // if is called directly from <Section />
  if (Object.keys(event).length === 0) {
    return null;
  }

  // event to find
  const idSection = props;

  // get event
  const findSection = event.sections.find((x) => x.id === idSection);

  // TODO insert error in case of wrong section
  // return
  return findSection;
};

export default useEventSection;
