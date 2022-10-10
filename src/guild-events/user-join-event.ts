import { GuildMember, MessageActionRow, MessageButton } from "discord.js";
import { logger } from "./../loggers/logger";
import { createGoogleUrl } from "./../connectors/google-connector";

const onUserJoinEvent = async (newMember: GuildMember): Promise<void> => {
  try {
    logger.info(`${newMember.displayName} joined the server`);

    const channel = await newMember.createDM();

    await channel.send(`Hey ${newMember.displayName}`);

    // Send a google authentication URL to the user
    const googleUrl = createGoogleUrl(newMember.user.id);
    const messageButton = new MessageButton().setLabel("Connexion google").setStyle("LINK").setURL(googleUrl);
    const actionRow = new MessageActionRow().addComponents(messageButton);
    await channel.send({
      content:
        "Connecte-toi avec google pour vérifier ton appartenance à l'Essiee-IT (Sans confirmation, tu restera avec le rôle 'Guest')",
      components: [actionRow],
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
};

export { onUserJoinEvent };
