import { GuildMember } from "discord.js";
import { logger } from "./../loggers/logger";

const onUserJoinEvent = async (newMember: GuildMember): Promise<void> => {
  logger.info(`${newMember.displayName} joined the server`);
};

export { onUserJoinEvent };
