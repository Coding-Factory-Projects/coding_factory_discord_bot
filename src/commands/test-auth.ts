import { SlashCommandBuilder } from "@discordjs/builders";
// import { createGoogleUrl } from "./../connectors/google-connector";
import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "ICommand";
import { adminRoleId } from "./../configs/discord-config";
import { createMicrosoftUrl } from "./../connectors/microsoft-connector";

const testAuthCommand: ICommand = {
  name: "testauth",
  roles: [adminRoleId],
  commandBuilder: new SlashCommandBuilder()
    .setName("testauth")
    .setDescription("Permet de tester l'authentification google en dm"),
  execute: async (interaction: CommandInteraction) => {
    const channel = await interaction.user.createDM();
    const googleUrl = createMicrosoftUrl(interaction.user.id);
    const messageButton = new MessageButton().setLabel("Connexion Microsoft").setStyle("LINK").setURL(googleUrl);
    const actionRow = new MessageActionRow().addComponents(messageButton);
    await interaction.reply({ content: "Testing microsoft auth", components: [actionRow] });
  },
};

export default testAuthCommand;
