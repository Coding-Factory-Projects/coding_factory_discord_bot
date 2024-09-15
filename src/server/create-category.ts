import { Guild, Permissions } from "discord.js";
import { logger } from "./../loggers/logger";
import { productOwnersRoleId, channels } from "./../configs/channels.json";

const createCategory = async (guild:Guild,name:string, promotionCampus:string) => {
  logger.info("Creating all the channels...");
  try {
    const role = await guild.roles.create({
      name:name + ' - ' + promotionCampus,
      hoist: true,
      reason: "import promotions",
      mentionable: true,
    });

    logger.info(`Creating the category for the role: ${role.name}`);

    // Create the category
    const createdCategory = await guild.channels.create(role.name, {
      type: 4,
      permissionOverwrites: [
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
    logger.info(`Creating the category for the role: ${role}`);

    // Create all the channels in the category
    for (const channel of channels) {
      logger.info(`Creating the channel ${channel.name} for the category`);
      if (channel.type === "text") await guild.channels.create(channel.name, { type: 0, parent: createdCategory.id });
      else if (channel.type === "voice")
        await guild.channels.create(channel.name, { type: 2, parent: createdCategory.id });
    }

    logger.info(`All the channels are created for the category ${role.name}`);
    logger.info("All the categories are now created !");
    return role.id;
  } catch (e) {
    console.log(e)
    logger.error(JSON.stringify(e));
    return 0;
  }
};

export default createCategory;
