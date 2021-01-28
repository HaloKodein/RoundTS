import { Client, Message } from 'discord.js';

export interface ICommand {
  client: Client,
  message: Message
}

export interface IHandlerConfig {
  enabled: boolean,
  maintenance: boolean
}

export interface IHandlerHelp {
  name: string,
  aliases: string[],
  permissions: number,
  config: IHandlerConfig
}

export interface IHandlerCommand {
  help: IHandlerHelp
  run(client, message, args): Promise<void>
}
