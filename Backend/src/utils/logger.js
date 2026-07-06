import pino from "pino";
import { env } from "../config/env.js";

let isDevelopment = env.nodeEnv;

export const logger = pino({
    level: isDevelopment ? "debug" : "info",

    transport: isDevelopment ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
    } : undefined,

    timestamp: pino.stdTimeFunctions.isoTime,

    redact: {
    paths: [
      "req.headers.authorization",
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "apiKey",
      "secret",
    ],
    censor: "[REDACTED]",
  },

});