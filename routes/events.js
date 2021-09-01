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
const { get, getGuide, post, put, del } = require("../controllers/events");

/**
 * @desc Routes
 */

/**
 * @route GET /api/guides
 * @desc  Get all the guides of a specific account, requires a valid token
 * @desc  The account ID will be decoded from the token
 * @access Private OR Public
 */

Router.get("/", auth, get);

/**
 * @route GET /api/guides
 * @desc  Get a specif guide, requires a valid token
 * @access Private OR Public
 */

Router.get("/:name", auth, getGuide);

/**
 * @route POST /api/guides
 * @desc  add a guides
 * @access Private
 */

Router.post("/", auth, post);

/**
 * @route PUT /api/guides
 * @desc  update a guide
 * @access Private
 */

Router.put("/:name", auth, put);

/**
 * @route DEL /api/guides
 * @desc  update a guide
 * @access Private
 */

Router.delete("/:name", auth, del);

module.exports = Router;
