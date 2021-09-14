/**
 * @desc CTRL for /api/users
 */

const bcrypt = require("bcrypt");
const crypto = require("crypto");

// models
const User = require("../models/User");

/**
 * @desc Routes
 */

// Post
exports.post = async (req, res, next) => {
  let { accountName, email, isAdmin, password } = req.body;

  try {
    // check if admin is TRUE or FALSE
    isAdmin ? (isAdmin = true) : (isAdmin = false);

    // check if the email is already used
    let signupEmail = await User.findOne({ email });

    // if TRUE
    if (signupEmail) {
      return next({
        success: false,
        message: "Email already exists!",
        status: 409,
      });
    }
    // check if the accountName is already used
    let signupAccountName = await User.findOne({ accountName });

    // if TRUE
    if (signupAccountName) {
      return next({
        success: false,
        message: "Account Name already exists!",
        status: 409,
      });
    }

    // generate salt
    let salt = await bcrypt.genSalt(10);

    // generate Password
    let hashedPassword = await bcrypt.hash(password, salt);

    // generate accountCode
    const accountCode = crypto.randomBytes(20).toString("hex");

    // create the obj to save
    const user = new User({
      ...req.body,
      accountCode: accountCode,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    // save
    await user.save();

    // return
    return res.json({ success: true, data: user });
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

// Put
exports.put = async (req, res, next) => {
  // extract name from params
  const { _id } = req.body; // it's the old name identifier

  try {
    // find and update the item using nameIdentifier
    const user = await User.findOneAndUpdate({ _id: _id }, req.body, {
      new: true,
    });

    // return
    return res.status(200).json({
      success: true,
      msg: "User updated sucessfully!",
      data: user,
      status: 200,
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
