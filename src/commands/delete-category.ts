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
    const category = interaction.options.getString("channel-id");
    if (!category) {
      await interaction.reply(`Veuillez renseigner la catégorie à supprimer`)  
      return
    }
    
    await interaction.reply(`Suppression de la catégorie ${category}`)
  }
}

export default deleteCategoryCommand;