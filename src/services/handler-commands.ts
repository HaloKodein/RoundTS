import config from "../config";
import commandService from "./command.service";
import { ICommand, IHandlerCommand } from "./interfaces";

export default class HandlerCommands {
  constructor(
    client,
    message,
  ) { this.execute({ client: client, message: message }) };

  private async execute(data: ICommand): Promise<void> {
    const message = data.message;
    const client = data.client;
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
}
