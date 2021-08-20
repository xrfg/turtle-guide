/**
 * @desc Middleware for validation
 */
const { check, validationResult } = require("express-validator");
// validator for middleware

const signupValidator = [
  // checks
  check("accountName", "Account Name is required!").not().isEmpty(),
  check("email", "Please insert a valid E-mail!").isEmail(),
  check(
    "password",
    "Please insert a valid password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res, next) => {
    // checks errors
    const errors = validationResult(req);

    // if not empty
    if (!errors.isEmpty()) {
      // create string of errors
      let errorsStr = "";
      errors.array().map((x, i) => {
        if (i === 0) {
          errorsStr += x.msg;
        }
        // if there are more than 1
        if (i > 0) {
          errorsStr += " " + x.msg;
        }
      });
      // return
      return next({
        message: errorsStr,
        error: errors.array(),
        status: 400,
      });
    }
    // if ok continues
    next();
  },
];

module.exports = { signupValidator };
