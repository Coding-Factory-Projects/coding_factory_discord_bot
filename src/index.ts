import { Client, Intents } from "discord.js";
import { token } from "./configs/discord-config.json";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log("The discord bot is ready");
});

client.login(token);
