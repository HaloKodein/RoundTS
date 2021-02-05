import { Client, Message } from 'discord.js';

export interface ICommand {
  client: Client,
  message: Message
}

export interface IHandlerConfig {
  enabled: boolean,
  maintenance: boolean,
  plus: boolean
}

export interface IHandlerHelp {
  name?: string,
  usage: string,
  description?: string,
  aliases?: string[],
  permissions?: number,
  config?: IHandlerConfig
}

export interface IHandlerCommandObj {
  help?: IHandlerHelp
}

export interface IHandlerCommand {
  help: IHandlerHelp
  run(client, message, args): Promise<void>
}
