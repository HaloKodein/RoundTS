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
      let evaled = eval(code) 
      if(!code)return message.reply('Digite um código')
      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);      
      const embed = new MessageEmbed()
      .setTitle(":white_check_mark: Executado!")
      .setColor("BLACK")
      .addField(`:inbox_tray: Input`, '```' + (code) + '```')
      .addField(`:outbox_tray: Output:`, '```' + clean(evaled) + '```')
      message.channel.send({embed});
    } catch (err) {
      var code = args.join(' ')
      const embed = new MessageEmbed()
      .setTitle(":negative_squared_cross_mark: Error")
      .setColor("#ff0000")
      .addField(`:inbox_tray: Input`, '```' + (code) + '```')
      .addField(`:outbox_tray: Output:`, '```' + clean(err) + '```')
      message.channel.send({embed})
    }
  }
}