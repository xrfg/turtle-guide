const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.use("/test", (req, res, next) => {
  res.send("<h1>HI TURTLES</h1>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
