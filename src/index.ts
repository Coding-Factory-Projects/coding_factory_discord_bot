import { Client, Intents } from "discord.js";
import { availableCommands } from "./get-available-commands";
import { onUserJoinEvent } from "./guild-events/user-join-event";

import * as dotenv from "dotenv";
dotenv.config();

import { token } from "./configs/discord-config";
import { logger } from "./loggers/logger";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.on("ready", () => {
  logger.info("The discord bot is ready");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  logger.info(`Launching command: ${commandName}`);

  const command = availableCommands.get(commandName);

  if (!command) return;

  command.execute(interaction);
});

client.on("guildMemberAdd", onUserJoinEvent);

client.login(token);

export { client };
