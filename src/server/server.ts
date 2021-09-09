import * as express from "express";
import { logger } from "./../loggers/logger";
import { port } from "./../configs/server-config.json";

const app = express();

app.get("/oauth2/redirect", (request: express.Request, response: express.Response) => {
  response.json({ success: true, message: "You are logged in with your google account" });
});

app.listen(port, () => {
  logger.info(`The web server started on port ${port}`);
});
