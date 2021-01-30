import { Client, Message, MessageEmbed } from "discord.js";
import db from "../services/db-service";

export = {
  help: {
    name: "Eval",
    aliases: ["eval","execute","ev"],
    permissions: 10,
    config: { enabled: true, maintenance: false }
  },
  run: async (client:Client, message:Message, args:string[]) => {
    function clean(text) {if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); else return text;};   
    const database = db;
    try {
      const code = args.join(" ");
      let evaled = await eval(code) 
      if(!code)return message.reply('Digite um código')
      if (typeof evaled !== "string")
      evaled = await require("util").inspect(evaled);
      const sucess = await new MessageEmbed()
      .setDescription('```ts\n' + clean(evaled) + '```')
      .setColor("#2f3136");
      await message.channel.send(sucess);
    } catch (err) {
      const error = await new MessageEmbed()
      .setDescription('```ts\n' + clean(err) + '```')
      .setColor("#2f3136");
      await message.channel.send(error);
    }
  }
}