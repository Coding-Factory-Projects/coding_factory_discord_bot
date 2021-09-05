import { createLogger, transports, format } from "winston";
import { logFormat } from "./log-format";
import {  } from "./../../package.json";
const { combine, timestamp, label, colorize } = format;

const logger = createLogger({
  format: combine(
    label({ label: "Coding BOT" }),
    timestamp(),
    logFormat,
    colorize({ all: true, colors: { info: "blue", error: "red" } })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ]
});

export {
  logger
}