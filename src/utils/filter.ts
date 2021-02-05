import { Message } from "discord.js";
import database from '../services/db-service';
import config from '../config';
import { IGuildSchemaObj } from "../schemas/IGuildSchema";
import { IUserSchemaObj } from "../schemas/IUserSchema";

class AdminFilter {
  public static async returned(message:Message, permissions: number): Promise<boolean> {
    const user:IUserSchemaObj = await database.findUser({ _id: message.author.id });
    if (user.admin) return true;
    
    if (permissions == 0) return true;
      else var number = 0;
    if (message.author.id == config.owner) number = 10;
      else number = 0;
    if (message.author.id == message.guild.owner.id) number = 4;
      else number = 0;
    if (message.author.id == message.guild.owner.id && message.author.id == config.owner) number = 10;
      else number = 0;
    if(permissions == number) return true;
      else return false;
  }
}

class GuildFilter {
  public static async returned(message: Message, permissions: boolean): Promise<boolean> {
    if (!permissions) return true;
    const guild:IGuildSchemaObj = await database.findGuild({ _id: message.guild.id });
    if (guild.plus == true) return true;
      else return false;
  }
}

export { AdminFilter, GuildFilter };