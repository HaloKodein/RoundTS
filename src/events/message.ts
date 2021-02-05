import commandService from '../services/command-service';
import { IHandlerCommand } from '../services/interfaces';
import { Client, Message } from 'discord.js';
import { AdminFilter, GuildFilter } from '../utils/filter';
import error from '../utils/error';
import database from '../services/db-service';
import { IGuildSchemaObj } from '../schemas/IGuildSchema';
import { IUserSchemaObj } from '../schemas/IUserSchema';

export = async (client:Client, message:Message) => {
  const user:IUserSchemaObj = await database.findUser({ _id: message.author.id });
  if (!user) await database.wrapperUser({_id: message.author.id,username: message.author.username, admin: false,money: 0,rep: 0,backgrounds: [],badges: []});
  const guild:IGuildSchemaObj = await database.findGuild({ _id: message.guild.id });
  if (!guild) await database.wrapperGuild({_id: message.guild.id,name: message.guild.name,prefix: "!",plus: false,blacklist: [],owner: {id: message.guild.owner.id,username: message.guild.owner.user.username}});
  const args = message.content.slice(guild.prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if(message.content.startsWith(`<@!${client.user.id}>`) && !args[0]) return message.channel.send(`Olá, meu prefixo nesse servidor é:\`\`${guild.prefix}\`\``);
  if (!message.content.includes(guild.prefix)) return;

  const cmd:IHandlerCommand = await commandService.commands.get(command) || commandService.commands.get(commandService.commandAliases.get(command));
  if (!cmd) return;

  if (!cmd.help.config.enabled) return error.sendChannel("Comando", "O comando foi desativado.", message);
  if (cmd.help.config.maintenance) return error.sendChannel("Comando", "O comando está em manutenção.", message);

  if (!await AdminFilter.returned(message, cmd.help.permissions)) return error.sendChannel("Comando", "O comando foi ativado apenas para devs.", message);
  if (!await GuildFilter.returned(message, cmd.help.config.plus)) return error.sendChannel("Comando", "O comando foi ativado apenas para servidores vips.", message);

  try {
    cmd.run(client, message, args);
  } catch(err) {
    console.error(err.message)
    return process.exit();
  }
}
