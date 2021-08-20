/**
 * @desc CTRL for /api/exhibitions
 */

// models
const Guide = require("../models/Guide");

/**
 * @desc Routes
 */

exports.get = async (req, res, next) => {
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
  console.log(req.body);

  try {
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

exports.put = async (req, res, next) => {};

exports.del = async (req, res, next) => {};
