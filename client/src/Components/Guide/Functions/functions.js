/**
 * @function goToSection
 * @param  history react routr dom hook
 * @param id id of the section
 * @param order order of the section
 * @param eventSlug event slug
 * @param nameIdentifier event name
 * @desc function to gotoa specific section
 */

exports.goToSection = (
  history,
  id,
  order,
  sectionIndex,
  eventSlug,
  nameIdentifier,
  direction = "next"
) => {
  history.push(`/events/${eventSlug}/sections/${id}`, {
    eventSlug: eventSlug,
    nameIdentifier: nameIdentifier,
    id: id,
    order: order,
    sectionIndex: sectionIndex,
    direction: direction,
  });
};

/**
 * @function extractNameIdentifier
 * @param hash i.e. window.location.pathname
 * @desc extracts the name identifier from the browser address
 * useed in  case a page is directly called
 */
exports.extractNameIdentifier = (path) => {
  // extract the event name from the navbar
  const indexCut = path.replace("/events/", "").search("/");
  return path.replace("/events/", "").substring(0, indexCut);
};

/**
 * @function extractNameIdentifier
 * @param hash i.e. window.location.pathname
 * @desc the last numbers from the path that is the id
 * of the section
 */
exports.getSectionFromAddress = (path) => {
  const reversePath = path.split("").reverse().join("");
  const findIndexCut = reversePath.search("/");
  return Number(
    reversePath.substring(0, findIndexCut).split("").reverse().join("")
  );
};
