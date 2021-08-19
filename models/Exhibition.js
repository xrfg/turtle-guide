/**
 * @desc Mongo Schema for Exhibitions
 * create an exhibition
 * use userSchema
 */

const mongoose = require("mongoose");

const exhibitionSchema = mongoose.Schema({
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

module.exports("Exhibition", exhibitionSchema);
