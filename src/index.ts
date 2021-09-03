import { Client, Intents } from "discord.js";
import { token } from "./configs/discord-config.json";
import { getCommands, initializeCommands } from "./deploy-commands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const availableCommands = getCommands()
initializeCommands(availableCommands);

client.on("ready", () => {
	console.log("The discord bot is ready");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = availableCommands.get(commandName);

	if (!command) return;
	
	command.execute(interaction, new Map())
});

client.login(token);
