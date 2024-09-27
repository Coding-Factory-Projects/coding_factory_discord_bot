import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageComponentInteraction, Permissions } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { roles, channels } from "./../configs/channels.json";
import { adminRoleId } from "./../configs/discord-config";
import { everyoneRoleId, productOwnersRoleId } from "./../configs/discord-config";

const createCategoryCommand: ICommand = {
  name: "createcategories",
  roles: [adminRoleId],
  commandBuilder: new SlashCommandBuilder()
    .setName("createcategories")
    .setDescription("Crée la catégorie de chaque rôle ainsi que tous leurs canaux (test)"),
  execute: async (interaction: MessageComponentInteraction) => {
    logger.info("Creating all the channels...");
    await interaction.reply("Création des channels...");
    try {
      for (const role of roles) {
        logger.info(`Creating the category for the role: ${role.role}`);
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
            },
          ],
        });

        // Create all the channels in the category
        for (const channel of channels) {
          logger.info(`Creating the channel ${channel.name} for the category`);
          if (channel.type === "text")
            await interaction.guild.channels.create(channel.name, { type: 0, parent: createdCategory.id });
          else if (channel.type === "voice")
            await interaction.guild.channels.create(channel.name, { type: 2, parent: createdCategory.id });
        }
        logger.info(`All the channels are created for the category ${role.role}`);
      }

      await interaction.editReply("Les catégories viennent d'être créés");
      logger.info("All the categories are now created !");
    } catch (e) {
      logger.error(JSON.stringify(e));
      await interaction.editReply("Une erreur s'est produite !");
    }
  },
};

export default createCategoryCommand;
