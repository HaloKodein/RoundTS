import fs from 'fs';
import { Collection } from 'discord.js';
import { IHandlerCommand } from './interfaces';

export default new class CommandService {
  constructor(){}

  public async startCommands():Promise<void> {
    await fs.readdir("./src/commands/", async (err, files) => {
      files.forEach(async cmd => {
        if (err) return console.error(`Não foi possivel carregar o comando ${cmd}: ${err}`);
        const props:IHandlerCommand = await import(`../commands/${cmd}`);
        if (cmd.split('.').slice(-1)[0] !== 'ts') return;
        this.commands.set(props.help.name.toLowerCase(), props);
        props.help.aliases.forEach(alias => {
          this.commandAliases.set(alias, props.help.name.toLowerCase());
        });
        console.log(`Carregando o comando ${props.help.name}`);
      });
    });
  }

  public commands = new Collection;
  public commandAliases = new Collection;
}