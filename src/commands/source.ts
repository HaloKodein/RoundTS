import { Client, Message, MessageEmbed } from "discord.js";

export = {
  help: {
    name: "Embed",
    usage: "embed <body>",
    description: "Cria uma embed",
    aliases: ["mkembed"],
    permissions: 10,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client: Client, message: Message, args) => {
    const json = args.join(" ").replace("{user}", message.author.username).replace("{guild}", message.guild.name).replace("{icon}", message.guild.iconURL({ dynamic: true, size: 2048, format: "png" })).replace("{avatar}", message.author.displayAvatarURL({ dynamic:true, size: 2048, format: "png" }));
    const parsed = JSON.parse(json);
    const embed = await Object.assign(new MessageEmbed(), parsed);
    
    return message.channel.send(embed);
  }
}