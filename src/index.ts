import { Client, Intents } from "discord.js";
import { availableCommands } from "./get-available-commands";
import { token } from "./configs/discord-config.json";
import { logger } from "./loggers/logger";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	logger.info("The discord bot is ready");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	logger.info(`Launching command: ${commandName}`);

	const command = availableCommands.get(commandName);

	if (!command) return;

	command.execute(interaction)
});

client.login(token);
