/**
 * @desc route /api/users
 * @desc route to create users
 */

const express = require("express");
const Router = express.Router();

// middleware / validators
const { signupValidator } = require("../middleware/validators");
const auth = require("../middleware/auth");

// CTRLs
const { post, put } = require("../controllers/users");

/**
 * @desc Routes
 */

/**
 * @route POST /api/users
 * @desc  add a new users
 * @access Private
 */

Router.post("/", signupValidator, post);

/**
 * @route PUT /api/users
 * @desc  update a new user
 * @access Private
 */

Router.put("/", auth, put);

module.exports = Router;
