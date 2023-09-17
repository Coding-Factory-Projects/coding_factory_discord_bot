import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { guestRoleId } from "./../configs/discord-config";
import { createMicrosoftUrl } from "./../connectors/microsoft-connector";

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
      const microsoftUrl = createMicrosoftUrl(guildMember.user.id)

      // Create and send the ephemeral message
      const microsoftMessageButton = new MessageButton()
        .setLabel("Connexion Microsoft")
        .setStyle("LINK")
        .setURL(microsoftUrl);
      const actionRow = new MessageActionRow().addComponents(microsoftMessageButton);
      await interaction.reply({
        content:
          "Connecte-toi avec ton mail étudiant pour avoir accès au reste du serveur (Sans confirmation, tu resteras avec le rôle 'Guest')",
          // "Connecte-toi avec google pour vérifier ton appartenance à l'Essiee-IT (Sans confirmation, tu restera avec le rôle 'Guest')",
        components: [actionRow],
        ephemeral: true
      });
    } catch (e) {
      logger.error(JSON.stringify((e)))
    }
  },
};

export default onboardCommand;
