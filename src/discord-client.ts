import { Client, Intents } from "discord.js";
import { token } from "./configs/discord-config";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
client.login(token);

export default client;
