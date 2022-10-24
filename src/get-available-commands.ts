import { readdirSync } from "fs";
import { ICommand } from "ICommand";
import { resolve } from "path";

function getCommands(): Map<string, ICommand> {
  const commandFiles = readdirSync(resolve(__dirname, "commands")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
  );
  const commands: Map<string, ICommand> = new Map();
  for (const file of commandFiles) {
    const { default: command } = require(`./commands/${file}`);
    commands.set(command.name, command);
  }
  return commands;
}

const availableCommands = getCommands();
export { availableCommands };
