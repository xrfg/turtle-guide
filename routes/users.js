/**
 * @desc route /api/users
 * @desc route to create users
 */

const express = require("express");
const Router = express.Router();

// middleware / validators
const { signupValidator } = require("../middleware/validators");

// CTRLs
const { post } = require("../controllers/users");

/**
 * @desc Routes
 */

/**
 * @route POST /api/users
 * @desc  add a users
 * @access Private
 */

Router.post("/", signupValidator, post);

module.exports = Router;
