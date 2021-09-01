/**
 * @desc Mongo Schema for Guides
 * create a guide
 * use userSchema
 */

const mongoose = require("mongoose");

const guideSchema = mongoose.Schema({
  // the name to get the guide on axios request i.e. "vangogh"
  nameIdentifier: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  // the title showed to the visitor i.e. "The World of Van Gogh"
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
