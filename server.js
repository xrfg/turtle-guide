const express = require("express");
const app = express();
const cors = require("cors");

// Mongo Connection

const connectDB = require("./config/db");

// PORT
const PORT = process.env.PORT;

/**
 * @desc Connect MONGO
 */
connectDB();

/**
 * @desc external middleware
 */

app.use(express.json({ extended: true }));

/**
 * @desc CORS
 */

app.use(cors());

/**
 * @desc Routes
 */

// app.use("/api/auth", );
app.use("/api/users", require("./routes/users"));
// app.use("/api/exhibitions", );

/**
 * @desc page not found middleware
 */

app.use((req, res, next) => {
  let message = "Page not Found";
  let status = 404;

  next({ message: message, status: status });
});

/**
 * @desc Global erorr middleware
 */

app.use((err, req, res, next) => {
  // default 500
  res.status(err.status || 500).send({
    success: false,
    message: "Something went wrong!",
    status: err.status,
    error: err.error,
  });
});

/**
 * @desc app listen
 */

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
