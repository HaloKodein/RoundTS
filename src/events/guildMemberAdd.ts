import { Client, Guild, GuildMember, Message } from 'discord.js';
import database from '../services/db-service';
import log from "../utils/log";

export = async (client:Client, member:GuildMember) => {
  const result = await database.findGuild({ _id: member.guild.id });
  if (result) return;

  await database.wrapperUser({
    _id: member.user.id,
    username: member.user.username,
    economy: { money: 0,rep: 0,backgrounds: [],badges: [] }
  }).then(() => log.info(`Usuario criado: ${member.user.username}(${member.user.id})`, "DATABASE"));
}