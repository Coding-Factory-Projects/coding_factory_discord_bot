import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageComponentInteraction, Permissions } from "discord.js";
import { ICommand } from "ICommand";
import { everyoneRoleId, productOwnersRoleId, roles, channels } from "./../configs/channels.json";

const createCategoryCommand: ICommand = {
  name: "createcategory",
  commandBuilder: new SlashCommandBuilder()
    .setName("createcategory")
    .setDescription("Create a category"),
  execute: async (interaction: MessageComponentInteraction, args: Map<string, string>) => {
    await interaction.reply("Création des channels...");
    try {
      for(const role of roles) {
        // Create the category
        const createdCategory = await interaction.guild.channels.create(role.role, {
          type: 4,
          permissionOverwrites: [
            {
              id: everyoneRoleId,
              deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
              id: productOwnersRoleId,
              allow: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
              id: role.id,
              allow: [Permissions.FLAGS.VIEW_CHANNEL],
            }
          ]
        });
        
        // Create all the channels in the category
        for(const channel of channels) {
          if (channel.type === "text")
            await interaction.guild.channels.create(channel.name, { type: 0, parent: createdCategory.id });
          else if (channel.type === "voice")
            await interaction.guild.channels.create(channel.name, { type: 2, parent: createdCategory.id });
        }
      }
      
      await interaction.editReply("Les catégories viennent d'être créés")
    } catch(e) {
      await interaction.editReply("Une erreur s'est produite !")
    }
  }
}

export default createCategoryCommand;