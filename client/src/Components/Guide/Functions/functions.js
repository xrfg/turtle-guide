/**
 * @function goToSection
 * @param  history react routr dom hook
 * @param id id of the section
 * @param order order of the section
 * @param eventSlug event slug
 * @param nameIdentifier event name
 * @desc function to gotoa specific section
 */

exports.goToSection = (history, id, order, eventSlug, nameIdentifier) => {
  history.push(`/events/${eventSlug}/sections/${id}`, {
    eventSlug: eventSlug,
    nameIdentifier: nameIdentifier,
    id: id,
    order: order,
  });
};
