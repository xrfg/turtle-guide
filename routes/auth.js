/**
 * @desc route to /api/
 * @desc  route to
 */

const express = require("express");
const Router = express.Router();

// middleware / validators
const auth = require("../middleware/auth");

//  CTRLs
const { get, post } = require("../controllers/auth");

/**
 * @desc Routes
 */

/**
 * @route GET /api/auth
 * @desc  get info of the authenticated user
 * @access Private
 */
Router.get("/", auth, get);

/**
 * @route POST /api/auth
 * @desc  to get a token
 * @access Public
 */

Router.post("/", post);

module.exports = Router;
