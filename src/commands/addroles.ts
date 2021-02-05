import { Client, Message, MessageEmbed } from 'discord.js';
import config from '../config';

export = {
  help: {
    name: "Addrole",
    usage: "addrole @roles | @user @roles",
    description: "Adicione cargos em um membro",
    aliases: ["addr"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client:Client, message:Message, args) => {
    if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("Eu não tenho permissões para gerenciar cargos!");
    const member = message.mentions.members.first() || client.guilds.cache.get(message.guild.id).members.cache.get(args[0]) || message.member;
    const roles = message.mentions.roles;
    if (!member.permissions.has("MANAGE_ROLES")) return message.channel.send("Você não tem permissão para isso!");
    if (!roles.first()) return message.channel.send("Por favor mencione os cargos!");
    
    const embed = await new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`
      **Os cargos**
      \`\`${await roles.map(e => { if(member.roles.cache.has(e.id)) return; member.roles.add(e.id).catch(message.channel.send); return e.name }).join(", ")}\`\`
      Foram adicionados ao membro: ${member.user.username}
    `)
    .setThumbnail(message.guild.iconURL())
    .setColor(config.utils.colors.default)
    .setFooter(client.user.username);

    message.channel.send(embed);
  }
}