import * as express from "express";
import * as path from "path";
import { logger } from "./../loggers/logger";
import { guildId } from "./../configs/discord-config.json";
import { port } from "./../configs/server-config.json";
import { client } from "./../index";

const app = express();

app.get("/oauth2/redirect", (request: express.Request, response: express.Response) => {
  response.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.get("/change-nickname", async (request: express.Request, response: express.Response) => {
  const guild = await client.guilds.fetch(guildId);
  if (!guild) {
    response.status(404).json({ success: false, message: "Le serveur spécifié n'existe pas" });
    return;
  }

  const { userId } = request.query as { userId: string };
  const user = await guild.members.fetch(userId);
  user.setNickname("Test nickname");

  response.json({ success: true, message: "Votre nom à bien été changé sur le serveur" });
});

app.listen(port, () => {
  logger.info(`The web server started on port ${port}`);
});
