import path from "path";
import pino from "pino";

let options;
if (process.env.NODE_ENV !== "development") {
  console.log("Production mode detected, logging to file...\n\n");
  options = pino.destination({ dest: path.join(__dirname, "..", "..", "logs", "server.log"), sync: false });
} else {
  options = {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      target: 'pino-pretty'
    },
  };
}

const logger = pino(options);

function createLogger(module: string, component?: string | "Component not provided") {
  // free child generator frfr
  return logger.child({ name: module, component: component });
}

export { createLogger };