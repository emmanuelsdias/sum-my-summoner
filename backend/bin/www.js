#!/usr/bin/env node

// Module dependencies.
import { createServer } from "https";
import debug from "debug";
import fs from "fs";
import app from "../index.js";

// Certificate for HTTPS
const privateKey = fs.readFileSync("./bin/server.key");
const certificate = fs.readFileSync("./bin/server.cert");

// Normalize a port into a number, string, or false
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // Named pipe
    return val;
  }
  if (port >= 0) {
    // Port number
    return port;
  }
  return false;
}

// Event listener for HTTPS server "error" event
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTPS server "listening" event.
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

// Get port from environment and store in Express
let port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

// Create HTTPS server
const options = {
  key: privateKey,
  cert: certificate,
};
const server = createServer(options, app);

// Listen on provided port, on all network interfaces
server.listen(port, () => {
  console.log(
    `Server running on port ${port}. Access it here https://localhost:${port}/`
  );
});
server.on("error", onError);
server.on("listening", onListening);
