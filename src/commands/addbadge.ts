import { Client, Message } from "discord.js";
import database from "../services/db-service";

export = {
  help: {
    name: "Addbadge",
    usage: "addbadge @user <badge>",
    description: "Adiciona uma embed em um usuário",
    aliases: [],
    permissions: 10,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client: Client, message: Message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) return message.channel.send("Por favor, mencione um usuário ou digite o id!");
    const usr = await database.findUser({ _id: user.id });
    if (!args[1]) return message.channel.send("Por favor insira o nome da badge!");
    const badge = await database.findBadge({ name: args[1] });
    if (!badge) return message.channel.send("Badge não encontrada ou inválida!");
    
    const have = await usr.badges.map(async e => {
      if(e.name.includes(args[1])) return message.channel.send("O usuário ja possui essa badge!")
    });

    await database.updateUser({ _id: user.id }, { badges: [...usr.badges, badge] });
    message.channel.send(`Badge adicionada com sucesso!`)
  }
}