import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "ICommand";

const createCategoryCommand: ICommand = {
  name: "createcategory",
  commandBuilder: new SlashCommandBuilder()
    .setName("createcategory")
    .setDescription("Create a category"),
  execute: (args: Map<string, string>) => {
    console.log(args);
  }
}

export default createCategoryCommand;