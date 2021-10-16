require("dotenv").config({ path: ".env" });
const http = require("http");
const logger = require("simple-node-logger").createSimpleLogger();
const PORT = process.env.PORT;
let HOSTNAME = process.env.DEV_HOST;
require("events").EventEmitter.defaultMaxListeners = 100;

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

try {
  const app = require("./app.js");
  const server = http.createServer(app);

  /** Stops request after => 2min */
  server.timeout = 60 * 60 * 1000;
  server.listen(PORT, () => {
    logger.info(`Server running on port: ${HOSTNAME}:${PORT}`);
  });
} catch (error) {
  logger.error(error);
}
