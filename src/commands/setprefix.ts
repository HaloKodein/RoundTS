import Discord, { Client, Message } from 'discord.js';
import database from '../services/db-service';
import sendError from "../utils/error";
import config from '../config';

export = {
  help: {
    name: "Setprefix",
    usage: "setprefix <prefix>",
    description: "Troca o prefixo do bot no servidor",
    aliases: ["stp"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: true }
  },
  run: async (client:Client, message:Message, args) => {
    const newPrefix = args.join(" ");
    if (!newPrefix) return message.channel.send("Insira o prefixo!");
    const guild = await database.updateGuild({ _id: message.guild.id }, { prefix: newPrefix });
    
    const embed = new Discord.MessageEmbed()
    .setDescription(`O prefixo do servidor foi trocado para \`\`${guild.prefix}\`\``)
    .setColor(config.utils.colors.plus);

    return message.channel.send(embed);
  }
}