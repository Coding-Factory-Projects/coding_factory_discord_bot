import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { guestRoleId } from "./../configs/discord-config";
import { createGoogleUrl } from "./../connectors/google-connector";

const onboardCommand: ICommand = {
  name: "onboard",
  roles: [guestRoleId],
  commandBuilder: new SlashCommandBuilder()
    .setName("onboard")
    .setDescription("Envoie le même message que lorsqu'un utilisateur rejoint le serveur"),
  execute: async (interaction: MessageComponentInteraction) => {
    logger.info(`Trigerring onboarding for ${interaction.user.username}`);

    try {
      // Fetch the guild member
      const guildMember = await interaction.guild.members.fetch({ user: interaction.user });

      // Generate the google url
      const googleUrl = createGoogleUrl(guildMember.user.id);

      // Create and send the ephemeral message
      const messageButton = new MessageButton().setLabel("Connexion google").setStyle("LINK").setURL(googleUrl);
      const actionRow = new MessageActionRow().addComponents(messageButton);
      await interaction.reply({
        content:
          "Connecte-toi avec google pour vérifier ton appartenance à l'Essiee-IT (Sans confirmation, tu restera avec le rôle 'Guest')",
        components: [actionRow],
        ephemeral: true
      });
    } catch (e) {
      logger.error(JSON.stringify((e)))
    }
  },
};

export default onboardCommand;
