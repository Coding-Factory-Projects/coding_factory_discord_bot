import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageComponentInteraction, CommandInteraction, Permissions } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { everyoneRoleId, productOwnersRoleId, channels } from "./../configs/channels.json";
import { adminRoleId } from "./../configs/discord-config";

const createCategoryCommand: ICommand = {
  name: "createcategory",
  roles: [adminRoleId],
  commandBuilder: new SlashCommandBuilder()
    .setName("createcategory")
    .setDescription("Crée une nouvelle catégorie (Admin)")
    .addStringOption((option) =>
      option.setName("name").setDescription("Nom de la catégorie").setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    logger.info("Creating all the channels...");
    await interaction.reply("Création des channels...");
    try {
      const categoryName = interaction.options.getString("name");
      logger.info(`Creating the category "${categoryName}"`);
      // Create the category
      const createdCategory = await interaction.guild.channels.create(categoryName, {
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
      logger.info(`All the channels are created for the category ${categoryName}`);

      await interaction.editReply("Les catégories viennent d'être créés");
      logger.info("All the categories are now created !");
    } catch (e) {
      logger.error(JSON.stringify(e));
      await interaction.editReply("Une erreur s'est produite !");
    }
  },
};

export default createCategoryCommand;
