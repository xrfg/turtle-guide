/**
 * @desc Mongo Schema for Guides
 * create a guide
 * use userSchema
 */

const mongoose = require("mongoose");

const guideSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  sections: {
    type: Array,
  },
  menuOne: {
    type: Array,
  },
  menuTwo: {
    type: Array,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Guide", guideSchema);
