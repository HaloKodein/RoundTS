import { Client, Message, MessageEmbed } from "discord.js";
import db from "../services/db-service";
import config from '../config';

export = {
  help: {
    name: "Eval",
    usage: "eval <code>",
    description: "Executa um código javascript",
    aliases: ["eval","execute","ev"],
    permissions: 10,
    config: { enabled: true, maintenance: false, plus: false }
  },
  run: async (client:Client, message:Message, args:string[]) => {
    function clean(text) {if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); else return text;};   
    const embed = new MessageEmbed();
    const database = db;
    try {
      const code = args.join(" ");
      let evaled = await eval(code) 
      if(!code)return message.reply('Digite um código')
      if (typeof evaled !== "string")
      evaled = await require("util").inspect(evaled);
      const sucess = await new MessageEmbed()
      .setDescription('```ts\n' + clean(evaled) + '```')
      .setColor(config.utils.colors.invisible);
      await message.channel.send(sucess);
    } catch (err) {
      const error = await new MessageEmbed()
      .setDescription('```ts\n' + clean(err) + '```')
      .setColor(config.utils.colors.invisible);
      await message.channel.send(error);
    }
  }
}