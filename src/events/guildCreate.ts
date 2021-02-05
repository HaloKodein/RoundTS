import { Client, Guild } from 'discord.js';
import database from '../services/db-service';
import log from "../utils/log";

export = async (client:Client, guild:Guild) => {
  await database.wrapperGuild({
    _id: guild.id,
    name: guild.name,
    prefix: "!",
    plus: false,
    blacklist: [],
    owner: {
      id: guild.owner.id,
      username: guild.owner.user.username
    }
  }).then(() => log.info(`Server criado: ${guild.name}(${guild.id})`, "DATABASE"));
  

  await guild.members.cache.map(async e => {
    if (e.user.bot) return;
    const result = await database.findUser({_id:e.id});
    if (result) return;
    await database.wrapperUser({_id: e.user.id,username: e.user.username,admin: false, money: 0,rep: 0,backgrounds: [],badges: []});
  });
}