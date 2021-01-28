import { Activity, Client } from 'discord.js';
import database from '../services/db-service';
import Log from '../utils/log';

export = async (client: Client) => {
  client.user.setActivity('RoundTS', { type:"STREAMING", url: "https://twitch.tv/roundts" });
  Log.info(`Online com ${client.users.cache.size} usuarios e ${client.guilds.cache.size} guilds`, "READY");
}
