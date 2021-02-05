import { Client, Message, MessageEmbed } from "discord.js";
import config from '../config';
import { ICollector, emoji, user } from "../interfaces/collector";

export = {
  help: {
    name: "Userinfo",
    usage: "userinfo | userinfo @user",
    description: "Retorna as informações do usuário",
    aliases: ["ui"],
    permissions: 0,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client: Client, message: Message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const member = message.mentions.members.first() || client.guilds.cache.get(message.guild.id).members.cache.get(args[0]) || message.member;
    const status = user.presence.status;
    const playing = user.presence.activities;
    switch(status) {
      case "online": var sts = `<:556678187786960897:806529311036407828> Online`; break;
      case "offline": var sts = `<:556678259778256896:806529311028412476> Offline`; break;
      case "invisible": var sts = `<:556678259778256896:806529311028412476> Invisivel`; break;
      case "dnd": var sts = `<:556678417018257408:806529311103647794> Não pertube`; break;
      case "idle": var sts = `<:556678338031255572:806529311104303145> Ausente`; break;
    };
    if (playing) var pl = `${playing}`; else pl = "Jogando nada!";
    const userinfo = new MessageEmbed()
    .setAuthor(`${user.username} Info`, client.user.displayAvatarURL())
    .addField('<:777360283920105534:806529310805852171> Tag', `${user.tag}`, true)
    .addField('<:755517738205708411:806529311171280965> ID', `${user.id}`, true)
    .addField('<:782612560167436288:806529310927487067> Status', `${sts}`, true)
    .addField('<:777360508022030357:806529311091720223> Jogando', `${playing}`, true)
    .addField('<:timerz:734973074365218860> Conta criada', `${user.createdAt}`, true)
    .addField('<:timerz:734973074365218860> Entrou em', `${member.joinedAt}`, true)
    .setThumbnail(user.displayAvatarURL())
    .setColor(config.utils.colors.default)
    .setFooter(client.user.username);

    message.channel.send(userinfo).then(async msg => {
      msg.react("739582712947671111");
      
      const collector:ICollector = (r:emoji, u:user) => r.emoji.id === "739582712947671111" && u.id === user.id;
      const filter = await msg.createReactionCollector(collector);

      filter.on("collect", (r, u) => {
        r.users.remove(u.id);
        const memberinfo = new MessageEmbed()
        .setAuthor(`${user.username} Info`, user.displayAvatarURL())
        .setDescription(`
          **<:role_update:734973074792775731> Cargos (${member.roles.cache.size})**
          \`\`${member.roles.cache.map(e => { return e.name }).join(", ")}\`\`
        `)
        .setThumbnail(user.displayAvatarURL())
        .setColor(config.utils.colors.default)
        .setFooter(client.user.username);
        msg.edit(memberinfo);
      })
    })
  }
}