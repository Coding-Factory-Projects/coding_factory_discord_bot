import * as express from "express";
import { logger } from "./../loggers/logger";
import { getUserInfos } from "./../connectors/google-connector";
import { guildId, baseRoleId, guestRoleId } from "../configs/discord-config";
import client from "./../discord-client";
import archivePromo from "./archive-promo";
import createCategory from "./create-category";

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

app.post("/on-promotion-created", async (request: express.Request, response: express.Response) => {
  const guild = await client.guilds.fetch(guildId);
  const body = await request.body;
  const promotionName = body.name;
  const promotionCampus = body.campus;
  if (!guild) {
    response.status(404).json({ success: false, message: "Le serveur spécifié n'existe pas" });
    return;
  }
  const roleId = await createCategory(guild, promotionName,promotionCampus)

  response.status(200).json({
    message: "La promotion a bien été créée",
    roleId: roleId,
  });
});

app.post("/on-promotion-updated", async (request: express.Request, response: express.Response) => {
  const guild = await client.guilds.fetch(guildId);
  if (!guild) {
    response.status(404).json({ success: false, message: "Le serveur spécifié n'existe pas" });
    return;
  }

  response.status(200).json({
    message: "La promotion a bien été updated",
  });
});

app.post("/archive-promotion", async (request: express.Request, response: express.Response) => {
  const body = await request.body;
  logger.info(`Body ${JSON.stringify(body)}`);
  const roleId = body.roleId;
  const guild = await client.guilds.fetch(guildId);
  if (!guild) {
    logger.error("Guild not found");
    response.status(404).json({ success: false, message: "Le serveur spécifié n'existe pas" });
    return;
  }
  const role = await guild.roles.fetch(roleId);
  if (!role) {
    logger.error("Role not found");
    response.status(404).json({ success: false, message: "Le role spécifié n'existe pas" });
    return;
  }
  logger.info("Role found");
  await archivePromo(guild, role);

  response.status(200).json({
    message: "La promotion a bien été archivée",
  });
});

app.post("/next-year", async (request: express.Request, response: express.Response) => {
  const guild = await client.guilds.fetch(guildId);
  if (!guild) {
    response.status(404).json({ success: false, message: "Le serveur spécifié n'existe pas" });
    return;
  }

  response.status(200).json({
    message: "Le passage à la nouvelle année à été effectué",
  });
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

const port = process.env.server_port || 3000;
app.listen(port, () => {
  logger.info(`The web server started on port ${port}`);
});
