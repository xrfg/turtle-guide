const mongoose = require("mongoose");

mongoose.connect({
  dbName: turtles,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
