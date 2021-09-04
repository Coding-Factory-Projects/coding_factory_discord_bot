import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

export interface ICommand {
  name: string
  commandBuilder: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
  execute: (interaction: Interaction) => void
}