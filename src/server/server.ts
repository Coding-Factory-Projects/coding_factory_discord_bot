import * as express from "express";
import { logger } from "./../loggers/logger";
import { getUserInfos } from "./../connectors/google-connector";
import { guildId, baseRoleId, guestRoleId } from "../configs/discord-config";
import client from "./../discord-client";

const app = express();
app.use(express.json());
app.use("/assets", express.static("assets"));

app.set("view engine", "ejs");

app.get("/oauth2/redirect", async (request: express.Request, response: express.Response) => {
  const { username, email } = await getUserInfos(request.query.code as string);
  response.render("index", { username, email });
});

app.post("/change-status", async (request: express.Request, response: express.Response) => {
  const guild = await client.guilds.fetch(guildId);
  if (!guild) {
    response.status(404).json({ success: false, message: "Le serveur spécifié n'existe pas" });
    return;
  }

  const role = await guild.roles.fetch(baseRoleId);
  const guestRole = await guild.roles.fetch(guestRoleId);
  if (!guild) {
    response.status(404).json({ success: false, message: "Les rôle spécifiés dans la configuration n'existent pas" });
    return;
  }

  const { userId, fullname, email } = request.body;

  const emailDomain = email.split("@")[1];
  const isValidEmailDomain = ["edu.itescia.fr", "edu.esiee-it.fr"].includes(emailDomain);
  if (isValidEmailDomain) {
    response
      .status(400)
      .json({ success: false, message: "Veuillez utiliser une adresse email edu.itescia.fr ou edu.esiee-it.fr." });
    return;
  }

  const user = await guild.members.fetch(userId);
  await user.setNickname(fullname);
  await user.roles.add(role);
  await user.roles.remove(guestRole);

  response.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`The web server started on port ${port}`);
});
