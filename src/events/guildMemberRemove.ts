import { Client, Guild, GuildMember, Message } from 'discord.js';
import database from '../services/db-service';
import log from "../utils/log";

export = async (client:Client, member:GuildMember) => {
  const result = await database.findGuild({ _id: member.guild.id });
  if (result) return;
  
  await database.deleteUser({ _id: member.user.id }).then(() => log.info(`Usuario deletado: ${member.user.username}(${member.user.id})`, "DATABASE"));
}