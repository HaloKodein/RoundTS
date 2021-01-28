import { Client, Message, MessageEmbed } from "discord.js"

export = {
  help: {
    name: "Avatar",
    aliases: ["foto","avt"],
    permissions: 0,
    config: { enabled: true, maintenance: false }
  },
  run: async (client: Client, message: Message, args: string[]) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = new MessageEmbed()
    .setDescription(`Avatar de [${user.username}](${user.displayAvatarURL({dynamic: true})})`)
    .setColor("BLACK")
    .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))

    message.channel.send(avatar);
  }
}