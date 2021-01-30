import commandService from '../services/command-service';
import { IHandlerCommand } from '../services/interfaces';
import config from '../config'
import { Client, Message } from 'discord.js';
import OwnerFilter from '../utils/filter';
import error from '../utils/error';
import database from '../services/db-service';
import { IGuildSchemaObj } from '../schemas/IGuildSchema';

export = async (client:Client, message:Message) => {
  const guild:IGuildSchemaObj = await database.findGuild({ _id: message.guild.id });
  if (!guild) { await database.wrapperGuild({_id: message.guild.id,name: message.guild.name,prefix: "!",plus: false,owner: {id: message.guild.owner.id,username: message.guild.owner.user.username}}) }
  if (!message.content.includes(guild.prefix)) return;
  
  const args = message.content.slice(guild.prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  const cmd:IHandlerCommand = await commandService.commands.get(command) || commandService.commands.get(commandService.commandAliases.get(command));
  if (!cmd) return;

  if (!cmd.help.config.enabled) return error.sendChannel("Comando", "O comando foi desativado.", message);
  if (cmd.help.config.maintenance) return error.sendChannel("Comando", "O comando está em manutenção.", message);

  const permissions = cmd.help.permissions;
  const returnedPermissions = OwnerFilter.returned(message, permissions);
  if (returnedPermissions == false) return;

  try {
    cmd.run(client, message, args);
  } catch(err) {
    console.error(err.message)
    return process.exit();
  }
}
