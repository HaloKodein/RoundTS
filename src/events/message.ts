import commandService from '../services/command-service';
import { IHandlerCommand } from '../services/interfaces';
import config from '../config'

export = async (client, message) => {
  if (!message.content.includes(config.PREFIX)) return;
  
  const args = message.content.slice(1).split(" ");
  const command = args.shift().toLowerCase();
  const cmd:IHandlerCommand = await commandService.commands.get(command) || commandService.commandAliases.get(commandService.commands.get(command));
  if (!cmd) return;
  try {
    cmd.run(client, message, args);
  } catch(err) {
    console.error(err.message)
    return process.exit();
  }
}
