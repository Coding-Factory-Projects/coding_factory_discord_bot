import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { logger } from "./loggers/logger";

import { clientId, guildId, token } from "./configs/discord-config.json";
import { availableCommands } from "./get-available-commands";

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
    const buildedCommands = Array.from(availableCommands.values()).map(command => command.commandBuilder.toJSON())
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: buildedCommands },
		);

		logger.info("Successfully registered application commands.");
		logger.info(`Commands registered: ${buildedCommands.map(command => command.name)}`)
	} catch (error) {
		console.error(error);
	}
})();