import commandService from '../services/command-service';
import { IHandlerCommand } from '../services/interfaces';
import config from '../config'
import { Client, Message } from 'discord.js';
import OwnerFilter from '../utils/filter';
import error from '../utils/error';

export = async (client:Client, message:Message) => {
  if (!message.content.includes(config.PREFIX)) return;
  
  const args = message.content.slice(1).split(" ");
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
