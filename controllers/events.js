/**
 * @desc CTRL for /api/exhibitions
 */

// models
const Guide = require("../models/Guide");

/**
 * @desc Routes
 */

exports.get = async (req, res, next) => {
  // extract the id to find all the records of account
  const { id } = req.user;

  try {
    // find all the item with that account
    const accountGuides = await Guide.find({ account: id });

    // returns
    return res.json({
      success: true,
      data: accountGuides,
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

exports.getGuide = async (req, res, next) => {
  /**
   * @TODO revice sa name (i.e. "vangogh") and gives the guide
   * @TODO check owner to give the guide
   */

  const { name } = req.params;

  try {
    // search fir the requested guide with the name
    // i.e. "vangogh"
    const guide = await Guide.findOne({
      nameIdentifier: name,
    });

    // if the requested guide does not exist
    // returns error

    if (!guide) {
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
      data: guide,
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

    const findIdentifier = await Guide.findOne({
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
    const guide = new Guide({ ...req.body });

    // save obj
    await guide.save();
    //
    return res.json({ success: true, data: guide });
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
  const { name } = req.params;

  try {
    // find and update the item using nameIdentifier
    const guide = await Guide.findOneAndUpdate(
      { nameIdentifier: name },
      req.body,
      {
        new: true,
      }
    );

    // return
    return res.json({
      success: true,
      msg: "Item updated sucessfully!",
      data: guide,
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
    const guide = await Guide.findOneAndDelete({ nameIdentifier: name });

    // return
    return res.json({
      success: true,
      msg: "Item Deleted sucessfully!",
      data: guide,
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