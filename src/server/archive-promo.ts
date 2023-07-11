import { Guild, Role } from "discord.js";
import { logger } from "../loggers/logger";
import { ChannelTypes } from "discord.js/typings/enums";

const archivePromo = async (guild:Guild,role:Role) => {
  try {
    logger.info("Archiving role");
    const roleName = role.name
    await role.edit({
      name: '[ARCHIVE] ' + roleName
    })

    logger.info("Archiving categories");
    await guild.channels.cache.each((channel) =>
    {
      if(channel.name === roleName && channel.type === 'GUILD_CATEGORY')
      {
        channel.edit({
          name:'[ARCHIVE] ' + roleName
        })
      }
    })
  } catch (e) {
    logger.error(JSON.stringify(e));
  }

};

export default archivePromo;
