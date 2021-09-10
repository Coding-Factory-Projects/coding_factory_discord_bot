import { Client, Intents } from "discord.js";
import { availableCommands } from "./get-available-commands";
import { token } from "./configs/discord-config.json";
import { logger } from "./loggers/logger";
import { onUserJoinEvent } from "./guild-events/user-join-event";

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
