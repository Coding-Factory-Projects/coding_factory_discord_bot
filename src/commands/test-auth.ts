import { SlashCommandBuilder } from "@discordjs/builders";
import { createGoogleUrl } from "./../connectors/google-connector";
import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "ICommand";

const testAuthCommand: ICommand = {
  name: "testauth",
  commandBuilder: new SlashCommandBuilder()
    .setName("testauth")
    .setDescription("Permet de tester l'authentification google en dm"),
  execute: async (interaction: CommandInteraction) => {
    const channel = await interaction.user.createDM();
    const googleUrl = createGoogleUrl(interaction.user.id);
    const messageButton = new MessageButton().setLabel("Connexion google").setStyle("LINK").setURL(googleUrl);
    const actionRow = new MessageActionRow().addComponents(messageButton);
    await interaction.reply({ content: "Testing google auth", components: [actionRow] });
  },
};

export default testAuthCommand;
