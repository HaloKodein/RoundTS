import { Client, Message } from "discord.js";
import database from "../services/db-service";

export = {
  help: {
    name: "Createbadge",
    usage: "createbadge <id> <name> <url>",
    description: "Cria uma embed",
    aliases: ["mkbadge"],
    permissions: 10,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client: Client, message: Message, args) => {
    const id = args[0];
    const name = args[1];
    const url = args[2];
    
    if (id && name && url){
      await database.wrapperBadge({ url: url, name: name, emoji: `<:${name}:${id}>` });
      message.channel.send(`Badge ${name} criada com sucesso!`)
    } else {
      return message.channel.send("Por favor siga os argumentos: id name url");
    }
  }
}