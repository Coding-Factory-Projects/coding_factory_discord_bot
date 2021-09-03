import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

export interface ICommand {
  name: string
  commandBuilder: SlashCommandBuilder,
  execute: (interaction: Interaction, args: Map<string, string>) => void
}