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
  try {
    const { username, email } = await getUserInfos(request.query.code as string);
    response.render("index", { username, email });
  } catch (e) {
    logger.error(JSON.stringify(e));
    response.render("error");
  }
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
  if (!isValidEmailDomain) {
    response
      .status(400)
      .json({ success: false, message: "Veuillez utiliser une adresse email edu.itescia.fr ou edu.esiee-it.fr." });
    return;
  }

  try {
    const user = await guild.members.fetch(userId);
    await user.setNickname(fullname);
    await user.roles.add(role);
    await user.roles.remove(guestRole);

    response.json({ success: true });
  } catch (e) {
    response.status(403).json({ success: false, message: "Permissions insuffisantes" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`The web server started on port ${port}`);
});
