import { Client, Intents } from "discord.js";
import { token } from "./configs/discord-config.json";
import { initializeCommands } from "./deploy-commands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

initializeCommands()

client.on("ready", () => {
	console.log("The discord bot is ready");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'createcategory') {
		await interaction.reply('Pong!');
	}
});

client.login(token);
