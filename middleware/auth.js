/**
 * @desc middleware fir authentication
 */

const jwt = require("jsonwebtoken");

/**
 *
 * @param {*} req required
 * @param {*} res results
 * @param {*} next move forward
 */

module.exports = async (req, res, next) => {
  // check if the header is undefined
  if (!res.header("Authorization")) {
    return next({
      success: false,
      message: "No Token, no auth!",
      status: 401,
    });
  }

  const token = req.header("Authorization").split(" ")[1];

  // check if has a token OR undefined
  if (!token) {
    return next({
      success: false,
      message: "No Token, no auth!",
      status: 401,
    });
  }
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // insert decoded user and token into req
    req.user = {
      //       _id: decoded.user.id,
      id: decoded.user.id,
      token,
    };
    next();
  } catch (error) {
    return next({
      success: false,
      message: "No valid Token!",
      status: 401,
    });
  }
};
