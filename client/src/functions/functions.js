/**
 * @desc Small functions to reuse
 */

/**
 * @function goBackToEvent
 * @param needsToSave boolean
 * @param history useHistory Hook
 * @desc go back to the event
 */

exports.goBackToPage = (needsToSave, history) => {
  if (needsToSave) {
    if (
      window.confirm(`You didn't save! Are you sure you want to go to back?`)
    ) {
      history.goBack();
    } else {
      return false;
    }
  } else {
    history.goBack();
  }
};

/**
 * @function unBlock
 * @param needsToSave boolean
 * @param history useHistory Hook
 * @desc  Listener to avoid the user to go back without saving
 */

exports.unBlock = (needsToSave, history) => {
  let unblock = history.block((tx) => {
    if (!needsToSave) {
      return null;
    }
    if (window.confirm(`Are you sure you want to go to Event?`)) {
      // Unblock the navigation.
      unblock();
      history.goBack();
    } else {
      return false;
    }
  });
  return unblock;
};
