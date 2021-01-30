import { Client } from 'discord.js';
import Log from '../utils/log';

export = async (client: Client) => {
  await import("../api/index");
  client.user.setActivity('RoundTS', { type:"STREAMING", url: "https://twitch.tv/roundts" });
  Log.info(`Online com ${client.users.cache.size} usuarios e ${client.guilds.cache.size} guilds`, "READY");
}