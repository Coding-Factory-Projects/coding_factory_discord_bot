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
    
    // TODO: Delete the category and it's channels
    
    await interaction.reply(`Suppression de la catégorie ${categoryId}`)
  }
}

export default deleteCategoryCommand;