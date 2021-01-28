import fs from 'fs';
import { Collection } from 'discord.js';
import { IHandlerCommand } from './interfaces';
import Log from '../utils/log';

export default new class CommandService {
  constructor(){}

  public async startCommands():Promise<void> {
    await fs.readdir("./src/commands/", async (err, files) => {
      files.forEach(async cmd => {
        if (err) return Log.error(`${cmd}: ${err}`, "COMMANDS");
        const props:IHandlerCommand = await import(`../commands/${cmd}`);
        if (cmd.split('.').slice(-1)[0] !== 'ts') return;
        this.commands.set(props.help.name.toLowerCase(), props);
        props.help.aliases.forEach(alias => {
          this.commandAliases.set(alias, props.help.name.toLowerCase());
        });
        Log.info(`Carregando ${props.help.name}`, "COMMANDS");
      });
    });
  }

  public commands = new Collection;
  public commandAliases = new Collection;
}
