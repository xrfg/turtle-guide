/**
 * @desc route /api/exhibitions
 * route manage exhibitions
 */

const express = require("express");
const Router = express.Router();

// middleware / validation
const auth = require("../middleware/auth");
// const { userEmailValidator } = require("../middleware/validators");

// CTRLs
const { get, getGuide, post, put, del } = require("../controllers/guides");

/**
 * @desc Routes
 */

/**
 * @route GET /api/guides
 * @desc  Get all the guides of a specific account, requires a valid token
 * @desc  The account ID will be decoded from the token
 * @access Private OR Public
 */

/**
 * @TODO add auth
 */

Router.get("/", auth, get);

/**
 * @route GET /api/guides
 * @desc  Get a specif guide, requires a valid token
 * @access Private OR Public
 */

/**
 * @TODO add auth
 */

Router.get("/:name", getGuide);

/**
 * @route POST /api/guides
 * @desc  add a guides
 * @access Private
 */

/**
 * @TODO add auth
 */

Router.post("/", post);

/**
 * @route PUT /api/guides
 * @desc  update a guide
 * @access Private
 */

/**
 * @TODO add auth
 */
Router.put("/:name", put);

/**
 * @route DEL /api/guides
 * @desc  update a guide
 * @access Private
 */

/**
 * @TODO add auth
 */

Router.delete("/:name", del);

module.exports = Router;
