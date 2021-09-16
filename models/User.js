/**
 * @desc Mongo Model for Users
 * creates a user
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  // company name (i.e. Museum GBMH)
  company: {
    type: String,
    require: true,
    unique: true,
  },
  // i.e. museumGbmh
  accountName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },
  password: {
    type: String,
    require: true,
  },
  plan: {
    type: String,
  },
  infoAbout: {
    type: Object,
    require: true,
    default: {},
  },
  // automatically generated
  accountCode: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
