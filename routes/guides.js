/**
 * @desc route /api/exhibitions
 * route manage exhibitions
 */

const express = require("express");
const Router = express.Router();

// middleware / validation
const { auth } = require("../middleware/auth");
// const { userEmailValidator } = require("../middleware/validators");

// CTRLs
const { get, post } = require("../controllers/guides");

/**
 * @desc Routes
 */

/**
 * @route GET /api/guides
 * @desc  Get logged in user, requires a valid token
 * @access Private OR Public
 */

/**
 * @TODO add auth
 */

Router.get("/:name", get);

/**
 * @route POST /api/guides
 * @desc  add a guides
 * @access Private
 */

/**
 * @TODO add auth
 */

Router.post("/", post);

module.exports = Router;
