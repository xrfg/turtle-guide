/**
 * @desc route /api/users
 * @desc route to create users
 */

const express = require("express");
const Router = express.Router();

// middleware / validators

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

Router.post("/", post);

module.exports = Router;
