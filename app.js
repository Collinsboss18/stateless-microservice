const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./config/logger");
const app = express();

// Import Routes
const IndexRoutes = require("./routes");

// APP Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", IndexRoutes);

// Unhandled Route Response
app.all("*", (req, res) => {
  res.status(404).send({
    statusCode: 404,
    message: `OOPs!! from HackerBay Backend. Server can't find ${req.originalUrl}.
      Check the API specification for further guidance`,
  });
});

// Unhandled Errors
app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).json(new ErrorResponse("Server error, try again"));
});

module.exports = app;
