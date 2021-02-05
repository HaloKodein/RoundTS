import { Client, Message, MessageEmbed } from "discord.js"
import database from '../services/db-service';
import config from '../config';

export = {
  help: {
    name: "Profile",
    usage: "profile | profile @user",
    description: "Mostra o perfil do usuario",
    aliases: ["perfil","info"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client:Client, message:Message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const usr = await database.findUser({ _id: user.id });
    const embed = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL({dynamic:true,size:2048}))
    .setDescription(`
      Badges: ${usr.badges.map(e => { return e.emoji }).join(" ")}
      Dinheiro: ${usr.money}
      Reputação: ${usr.rep}
    `)
    .setThumbnail(user.displayAvatarURL({dynamic:true,size:2048,format:'png'}))
    .setColor(config.utils.colors.default);
    message.channel.send(embed)
  }
}