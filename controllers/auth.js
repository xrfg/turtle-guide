/**
 * @desc CTRL for /api/auth
 * to get a user info or a token
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

/**
 * @desc Routes
 */

exports.get = async (req, res, next) => {
  // the id is returned by the auth middleware
  const { id } = req.user;
  try {
    // look for the user
    const user = await User.findById(id).select("-password");
    // return
    return res.status(200).json({ success: true, data: user, status: 200 });
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
  const { email, password } = req.body;

  try {
    // check email
    let user = await User.findOne({ email });
    // if FALSE
    if (!user) {
      return next({
        success: false,
        message: "Invalid credentials",
        status: 400,
      });
    }

    /**
     * @desc compares the provided password with
     * the user password extracted with the email
     */

    const isMatch = await bcrypt.compare(password, user.password);

    // if FALSE
    if (!isMatch) {
      return next({
        success: false,
        message: "Invalid credentials",
        status: 400,
      });
    }

    //   create payload
    const payload = {
      user: { id: user.id },
    };

    // creates and returns a token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      // for development: expires in 30days
      { expiresIn: "30d" },
      (err, token) => {
        if (err) {
          return next({
            success: false,
            message: error,
            status: 404,
            error: `${error}`,
          });
        }
        return res.json({ success: true, data: { token } });
      }
    );
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
