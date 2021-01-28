import { Activity, Client } from 'discord.js';
import database from '../services/db-service';
import Log from '../utils/log';

export = async (client: Client) => {
  client.users.cache.map(async e => {
    if (e.bot) return;
    const result = await database.findUser({_id:e.id});
    if (result) return;
    database.wrapperUser({_id: e.id,username: e.username,economy: {money: 0,rep: 0,backgrounds: [],badges: []}});
  });
  Log.info(`Online com ${client.users.cache.size} usuarios e ${client.guilds.cache.size} guilds`, "READY");
}
