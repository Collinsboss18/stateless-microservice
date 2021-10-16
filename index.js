require("dotenv").config({ path: ".env" });
const http = require("http");
const logger = require("./config/logger");
let HOSTNAME = process.env.DEV_HOST;
const PORT = process.env.PORT;

process.on("uncaughtException", (err) => {
  logger.error(
    `UNCAUGHT EXCEPTION! Server Shutting down...\n
      ${err.name} \n ${err.message} \n ${err.stack}`
  );
  process.exit(1);
});

if (process.env.NODE_ENV !== "development") {
  HOSTNAME = process.env.HOST;
}

const app = require("./app.js");
const server = http.createServer(app);

/** Stops request after => 2min */
server.timeout = 60 * 60 * 1000;
server.listen(PORT, HOSTNAME, () =>
  logger.log(`Server running on port: ${HOSTNAME}:${PORT}, DB: connected`)
);
