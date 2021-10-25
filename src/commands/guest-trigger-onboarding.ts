import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageComponentInteraction } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { onUserJoinEvent } from "./../guild-events/user-join-event";

const createCategoryCommand: ICommand = {
  name: "onboard",
  commandBuilder: new SlashCommandBuilder()
    .setName("onboard")
    .setDescription("Envoie le même message que lorsqu'un utilisateur rejoint le serveur"),
  execute: async (interaction: MessageComponentInteraction) => {
    logger.info(`Trigerring onboarding for ${interaction.user.username}`);

    const guildMember = await interaction.guild.members.fetch({ user: interaction.user });
    await onUserJoinEvent(guildMember);

    await interaction.reply("Les messages vous ont été renvoyés en messages privés");
  },
};

export default createCategoryCommand;
