/**
 * @desc route to /api/
 * @desc  route to
 */

const express = require("express");
const Router = express.Router();

//validators

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
Router.get("/", get);

/**
 * @route POST /api/auth
 * @desc  to get a token
 * @access Private
 */

Router.post("/", post);

module.exports = Router;
