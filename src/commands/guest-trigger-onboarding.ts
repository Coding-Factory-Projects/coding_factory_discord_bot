import { SlashCommandBuilder } from "@discordjs/builders";
import { ContextMenuInteraction, MessageComponentInteraction } from "discord.js";
import { ICommand } from "ICommand";
import { logger } from "./../loggers/logger";
import { adminRoleId, guestRoleId } from "./../configs/discord-config";
import { sendEmail } from "./../connectors/mail-connector";

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

      // TODO: Check the email (at least the domain)

      const url = `${process.env.website_url}/?discord_id=${guildMember.user.id}&email=${email}`

      // Send the email with the url
      await sendEmail(url, email);

      await interaction.reply({
        content: "Un email a été envoyé pour confirmer ton inscription",
        ephemeral: true
      });
    } catch (e) {
      logger.error(JSON.stringify((e)))
      await interaction.reply({
        content: "L'email de confirmation n'a pas pu être envoyé",
        ephemeral: true
      })
    }
  },
};

export default onboardCommand;
