import { SlashCommandBuilder } from "@discordjs/builders";

export interface ICommand {
  name: string
  commandBuilder: SlashCommandBuilder,
  execute: (args: Map<string, string>) => void
}