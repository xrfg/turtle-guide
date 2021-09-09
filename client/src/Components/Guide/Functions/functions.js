/**
 * @desc function to gotoa specific section
 */

exports.goToSection = (history, id, order, eventSlug, nameIdentifier) => {
  history.push(`sections/${id}`, {
    eventSlug: eventSlug,
    nameIdentifier: nameIdentifier,
    id: id,
    order: order,
  });
};
