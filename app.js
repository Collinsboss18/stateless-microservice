const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("simple-node-logger").createSimpleLogger();
const app = express();

// Import Routes
const IndexRoutes = require("./routes");

// APP Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", IndexRoutes);

// Unhandled Errors
app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).json(new ErrorResponse("Server error, try again"));
});

// Unhandled Route Response
app.all("*", (req, res) => {
  res.status(404).send({
    statusCode: 404,
    message: `OOPs!! from HackerBay Backend. Server can't find ${req.originalUrl}.
      Check the API specification for further guidance`,
  });
});

module.exports = app;
