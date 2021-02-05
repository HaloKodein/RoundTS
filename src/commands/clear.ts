import Discord, { Client, Message } from "discord.js";
import config from '../config';

export = {
  help: {
    name: "Clear",
    usage: "clear <amount>",
    description: "Apaga uma quantidade de mensagem",
    aliases:  ["delete","apagar","deletar","purge"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client:Client, message:Message, args) => {
    const clearLenght:number = args.join(" ");
    if (!clearLenght) return message.channel.send("Insira á quantidade!");
    if (isNaN(clearLenght)) return message.channel.send("Insira apenas numeros!");

    message.channel.bulkDelete(clearLenght);

    const embed = new Discord.MessageEmbed()
    .setDescription(`Chat limpo por: ${message.author.username}`)
    .setColor(config.utils.colors.default);

    return message.channel.send(embed);
  }
}