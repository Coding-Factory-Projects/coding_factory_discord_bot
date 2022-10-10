import { createLogger, transports, format } from "winston";
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";
import { logFormat } from "./log-format";
const { combine, timestamp, label, colorize } = format;

const loggerTransports: Array<FileTransportInstance | ConsoleTransportInstance> = [
  new transports.File({ filename: "logs/error.log", level: "error" }),
  new transports.File({ filename: "logs/combined.log" }),
];

// if (process.env.NODE_ENV !== "production") loggerTransports.push(new transports.Console());
loggerTransports.push(new transports.Console());

const logger = createLogger({
  format: combine(
    label({ label: "Coding BOT" }),
    timestamp(),
    logFormat,
    colorize({ all: true, colors: { info: "blue", error: "red" } })
  ),
  transports: loggerTransports,
});

export { logger };
