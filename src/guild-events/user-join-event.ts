import { GuildMember } from "discord.js";
import { logger } from "./../loggers/logger";
import { getGoogleUrl } from "./../connectors/google-connector";

const onUserJoinEvent = async (newMember: GuildMember): Promise<void> => {
  logger.info(`${newMember.displayName} joined the server`);

  const channel = await newMember.createDM();

  await channel.send(`Hey ${newMember.displayName}`);
  await channel.send("Avant de pouvoir rejoindre ce serveur, on aimerai te poser quelques questions !");
  await channel.send("Première question, c'est quoi ton nom ? (Cela va servir à te renommer sur le serveur)");

  // Send a google authentication URL to the user
  await channel.send(getGoogleUrl());
};

export { onUserJoinEvent };
