import { Client, Message, MessageEmbed } from "discord.js"
import config from '../config';
import database from "../services/db-service";

export = {
  help: {
    name: "Avatar",
    usage: "avatar | avatar @user",
    description: "Mostra o avatar do usuário mencionado",
    aliases: ["foto","avt"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client: Client, message: Message, args: string[]) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const usuario = await database.findUser({ _id: user.id });
    const avatar = new MessageEmbed()
    .setDescription(`Avatar de [${user.username}](${user.displayAvatarURL({dynamic: true})})`)
    .setColor(config.utils.colors.default)
    .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}));
    
    message.channel.send(avatar)
  }
}