/**
 * @desc route /api/exhibitions
 * route manage exhibitions
 */

const express = require("express");
const Router = express.Router();

// Validators
// const { userEmailValidator } = require("../middleware/validators");

// CTRLs
// const { post } = require("../controllers/exhibitions");

/**
 * @desc Routes
 */

/**
 * @route GET /api/exhibitions
 * @desc  Get logged in user, requires a valid token
 * @access Private OR Public
 */

// Router.get("/", userEmailValidator, post);

/**
 * @route POST /api/exhibitions
 * @desc  add a exhibitions
 * @access Private
 */

// Router.post("/", userEmailValidator, post);

module.exports = Router;
