import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageComponentInteraction } from "discord.js";
import { ICommand } from "ICommand";

const createCategoryCommand: ICommand = {
  name: "createcategory",
  commandBuilder: new SlashCommandBuilder()
    .setName("createcategory")
    .setDescription("Create a category"),
  execute: async (interaction: MessageComponentInteraction, args: Map<string, string>) => {
    console.log(args);
    await interaction.reply("Pong !")
  }
}

export default createCategoryCommand;