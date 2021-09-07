/**
 * @desc CTRL for /api/exhibitions
 */

// models
const Event = require("../models/Event");

/**
 * @desc Routes
 */

exports.get = async (req, res, next) => {
  // extract the id to find all the records of account
  const { id } = req.user;

  try {
    // find all the item with that account
    const accountEvents = await Event.find({ account: id });

    // returns
    return res.json({
      success: true,
      data: accountEvents,
    });
  } catch (error) {
    /**
     * @desc sends error to the global error middleware
     */
    return next({
      success: false,
      message: error,
      status: 404,
      error: `${error}`,
    });
  }
};

exports.getEvent = async (req, res, next) => {
  /**
   * @TODO revice sa name (i.e. "vangogh") and gives the Event
   * @TODO check owner to give the Event
   */

  const { name } = req.params;

  try {
    // search fir the requested event with the name
    // i.e. "vangogh"
    const event = await Event.findOne({
      nameIdentifier: name,
    });

    // if the requested event does not exist
    // returns error

    if (!event) {
      /**
       * @desc sends error to the global error middleware
       */
      return next({
        success: false,
        message: "The item does not exist",
        status: 404,
      });
    }

    // returns
    return res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    /**
     * @desc sends error to the global error middleware
     */
    return next({
      success: false,
      message: error,
      status: 404,
      error: `${error}`,
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    // check if the nameIdentifier is already used
    const { nameIdentifier } = req.body;

    const findIdentifier = await Event.findOne({
      nameIdentifier: nameIdentifier,
    });
    // if TRUE means that the nameIdentifier is already used
    if (findIdentifier) {
      return next({
        success: false,
        message:
          "The Name Identifier must be unique! Please enter another one.",
        status: 409,
      });
    }

    // create obj
    const event = new Event({ ...req.body });

    // save obj
    await event.save();
    //
    return res.json({ success: true, data: event });
  } catch (error) {
    /**
     * @desc sends error to the global error middleware
     */
    return next({
      success: false,
      message: error,
      status: 404,
      error: `${error}`,
    });
  }
};

exports.put = async (req, res, next) => {
  // extract name from params
  const { name } = req.params; // it's the old name identifier

  // create a new obj WITHOUT the oldNameIdentifier key
  delete req.body.oldNameIdentifier;

  try {
    // find and update the item using nameIdentifier
    const event = await Event.findOneAndUpdate(
      { nameIdentifier: name },
      req.body, // the oldNameIdentifier is removed
      {
        new: true,
      }
    );

    // return
    return res.json({
      success: true,
      msg: "Item updated sucessfully!",
      data: event,
    });
  } catch (error) {
    /**
     * @desc sends error to the global error middleware
     */
    return next({
      success: false,
      message: error,
      status: 404,
      error: `${error}`,
    });
  }
};

exports.del = async (req, res, next) => {
  // extract name from params
  const { name } = req.params;

  try {
    // find and update the item using nameIdentifier
    const event = await Event.findOneAndDelete({ nameIdentifier: name });

    // return
    return res.json({
      success: true,
      msg: "Item Deleted sucessfully!",
      data: event,
    });
  } catch (error) {
    /**
     * @desc sends error to the global error middleware
     */
    return next({
      success: false,
      message: error,
      status: 404,
      error: `${error}`,
    });
  }
};
