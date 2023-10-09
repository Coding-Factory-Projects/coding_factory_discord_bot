import { SlashCommandBuilder } from "@discordjs/builders";
import { ContextMenuInteraction, MessageComponentInteraction } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { adminRoleId, guestRoleId } from "./../configs/discord-config";
import { sendEmail } from "connectors/mail-connector";

const onboardCommand: ICommand = {
  name: "onboard",
  roles: [guestRoleId],
  commandBuilder: new SlashCommandBuilder()
    .setName("onboard")
    .addStringOption(
      (option) => option
        .setName("mail_etudiant")
        .setDescription("Ton adresse email etiduante")
        .setRequired(true))
    .setDescription("Envoie le même message que lorsqu'un utilisateur rejoint le serveur"),
  execute: async (interaction: MessageComponentInteraction & ContextMenuInteraction) => {
    logger.info(`Trigerring onboarding for ${interaction.user.username}`);

    try {
      // Fetch the guild member
      const guildMember = await interaction.guild.members.fetch({ user: interaction.user });

      const email = interaction.options.getString("mail_etudiant");

      const url = `${process.env.website_url}/confirm-user?discord_id=${guildMember.user.id}`

      // Send the email with the url
      await sendEmail(url, email);

      await interaction.reply({
        content: "Un email a été envoyé pour confirmer ton nom",
        ephemeral: true
      });


      // Generate the google url
      // const googleUrl = createGoogleUrl(guildMember.user.id);
      // const microsoftUrl = createMicrosoftUrl(guildMember.user.id)

      // Create and send the ephemeral message
      // const messageButton = new MessageButton().setLabel("Connexion Google").setStyle("LINK").setURL(googleUrl);
      // const microsoftMessageButton = new MessageButton().setLabel("Connexion Microsoft").setStyle("LINK").setURL(microsoftUrl);
      // const actionRow = new MessageActionRow().addComponents(messageButton, microsoftMessageButton);
      // await interaction.reply({
      //   content:
      //     "Connecte-toi avec ton mail étudiant pour avoir accès au reste du serveur (Sans confirmation, tu resteras avec le rôle 'Guest')",
      //     // "Connecte-toi avec google pour vérifier ton appartenance à l'Essiee-IT (Sans confirmation, tu restera avec le rôle 'Guest')",
      //   components: [actionRow],
      //   ephemeral: true
      // });
    } catch (e) {
      logger.error(JSON.stringify((e)))
    }
  },
};

export default onboardCommand;
