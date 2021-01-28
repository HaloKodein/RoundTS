import { Client, Message } from 'discord.js';

export interface ICommand {
  client: Client,
  message: Message
}

export interface IHandlerHelp {
  name: string,
  aliases: string[],
  permissions: number
}

export interface IHandlerCommand {
  help: IHandlerHelp
  run(client, message, args): Promise<void>
}