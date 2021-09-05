import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ICommand } from "ICommand";

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
    
    const categoryChannels = interaction.guild.channels.cache.filter(channel => channel.parentId === category.id);
    
    for (const channel of categoryChannels.values()) {
      await channel.delete();
    }

    await category.delete();
    
    await interaction.reply(`Suppression de la catégorie ${category.name}`);
  }
}

export default deleteCategoryCommand;