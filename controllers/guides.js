/**
 * @desc CTRL for /api/exhibitions
 */

// models
const Guide = require("../models/Guide");

/**
 * @desc Routes
 */

exports.get = async (req, res, next) => {};

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
