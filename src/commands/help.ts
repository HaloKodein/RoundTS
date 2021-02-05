import { Client, Message, MessageEmbed } from 'discord.js';
import { IHandlerCommandObj } from '../services/interfaces';
import service from '../services/command-service';
import config from '../config';

export = {
  help: {
    name: "Help",
    usage: "help | help [command]",
    description: "Retorna uma lista com todos os comandos",
    aliases: ["ajuda", "h"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client:Client, message:Message, args) => {
    if (!args[0]){
      const commandinfo = await service.commands.map((cmd:IHandlerCommandObj) => {
        return `**${cmd.help.name}** \`\`${cmd.help.description}\`\``
      });
      const help = new MessageEmbed()
      .setAuthor(`Help - ${client.user.username}`, client.user.displayAvatarURL())
      .setDescription(commandinfo)
      .setThumbnail("https://media.discordapp.net/attachments/800512498221711363/806508566113681479/771470994266783764.png")
      .setColor(config.utils.colors.default)
      .setFooter(client.user.username);
  
      message.channel.send(help)
    } else {
      const commandinfo:IHandlerCommandObj = await service.commands.get(args[0]);
      if (!commandinfo) return message.channel.send("Comando não encontrado!");
      if (commandinfo.help.permissions >= 10) var perm = "Admin"; else var perm = "Membro";
      if (commandinfo.help.config.enabled) var enabled = "Sim"; else var enabled = "Não";
      if (commandinfo.help.config.maintenance) var maintenance = "Sim"; else var maintenance = "Não";
      if (commandinfo.help.config.plus) var plus = "Sim"; else var plus = "Não";
      if (commandinfo.help.aliases.length > 0) var aliases = commandinfo.help.aliases.join(","); else var aliases = "Nenhum";

      const help = new MessageEmbed()
      .setAuthor(commandinfo.help.name, client.user.displayAvatarURL())
      .setDescription(`
        **Como usar**: \`\`${commandinfo.help.usage}\`\`
        **Descrição**: \`\`${commandinfo.help.description}\`\`
        **Permissão**: \`\`${perm}\`\`
        **Ativado**: \`\`${enabled}\`\`
        **Manutenção**: \`\`${maintenance}\`\`
        **Vip**: \`\`${plus}\`\`
      `)
      .setThumbnail("https://cdn.discordapp.com/emojis/739582712947671111.png?v=1")
      .setColor(config.utils.colors.default)
      .setFooter(`Aliases: ${aliases}`);
  
      message.channel.send(help)
    }
  }
}