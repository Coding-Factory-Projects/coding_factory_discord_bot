import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";

const deleteCategoryCommand: ICommand = {
  name: "deletecategory",
  commandBuilder: new SlashCommandBuilder()
    .setName("deletecategory")
    .setDescription("Supprime la catégorie spécifiée et toous les canaux contenus à l'intérieur")
    .addStringOption(
      (option) => option
        .setName("channel-id")
        .setDescription("L'identifiant de la catégorie à supprimer").setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    const categoryId = interaction.options.getString("channel-id");
    
    const category = await interaction.guild.channels.fetch(categoryId);
    logger.info(`Deleting the category "${category.name}"...`);
    
    const categoryChannels = interaction.guild.channels.cache.filter(channel => channel.parentId === category.id);
    
    for (const channel of categoryChannels.values()) {
      await channel.delete();
      logger.info(`${channel.name} is delete for the category ${category.name}`);
    }

    await category.delete();
    
    await interaction.reply(`Suppression de la catégorie ${category.name}`);
    logger.info(`The category "${category.name}" is now deleted !`);
  }
}

export default deleteCategoryCommand;