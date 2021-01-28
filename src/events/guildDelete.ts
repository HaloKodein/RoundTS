import { Client, Guild } from 'discord.js';
import database from '../services/db-service';
import log from "../utils/log";

export = async (client:Client, guild:Guild) => {
  const result = await database.findGuild({ _id: guild.id });
  if (result) return;

  await database.deleteGuild({ _id: guild.id }).then(() => log.info(`Server deletado: ${guild.name}(${guild.id})`, "DATABASE"));
}