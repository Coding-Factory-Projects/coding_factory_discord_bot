import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import { resolve } from "path";

import { clientId, guildId, token } from "./configs/discord-config.json";
import { ICommand } from "ICommand";

const rest = new REST({ version: "9" }).setToken(token);

const initializeCommands = async () => {
	try {
    const commandFiles = readdirSync(resolve(__dirname, "commands")).filter(file => file.endsWith(".js"))
    const commands: ICommand[] = []
    for(const file of commandFiles) {
      const { default: command } = await import(`./commands/${file}`)
      commands.push(command)
    }

    const buildedCommands = commands.map(command => command.commandBuilder.toJSON())
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: buildedCommands },
		);

		console.log("Successfully registered application commands.");
	} catch (error) {
		console.error(error);
	}
};

export { initializeCommands };