import pino from "pino";
import { envVar } from "../config/env.js";

let isDevelopment = envVar.nodeEnv;

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