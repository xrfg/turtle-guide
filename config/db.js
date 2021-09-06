const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, dbOptions);
    // ! just for unit testing
    // await mongoose.connection.db.dropCollection("events");

    console.log(`MongoDB connected...`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
