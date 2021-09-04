import { Client, Intents } from "discord.js";
import { availableCommands } from "./get-available-commands";
import { token } from "./configs/discord-config.json";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log("The discord bot is ready");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = availableCommands.get(commandName);

	if (!command) return;

	command.execute(interaction)
});

client.login(token);
