import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import { resolve } from "path";

import { clientId, guildId, token } from "./configs/discord-config.json";
import { ICommand } from "ICommand";

const rest = new REST({ version: "9" }).setToken(token);

function getCommands(): Map<string, ICommand> {
	const commandFiles = readdirSync(resolve(__dirname, "commands")).filter(file => file.endsWith(".js"))
	const commands: Map<string, ICommand> = new Map();
	for(const file of commandFiles) {
		const { default: command } = require(`./commands/${file}`);
		commands.set(command.name, command);
	}
	return commands;
}

const initializeCommands = async (commands: Map<string, ICommand>) => {
	try {
    const buildedCommands = Array.from(commands.values()).map(command => command.commandBuilder.toJSON())
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: buildedCommands },
		);

		console.log("Successfully registered application commands.");
	} catch (error) {
		console.error(error);
	}
};

export { getCommands, initializeCommands };