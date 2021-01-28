import { Message } from "discord.js";
import config from '../config';

export default class OwnerFilter {
  public static returned(message:Message, permissions: number): boolean {
    if (permissions == 0) return true;
      else var number = 0;
    if (message.author.id == config.OWNER_ID) number = 10;
      else number = 0;
    if (message.author.id == message.guild.owner.id) number = 4;
      else number = 0;
    if (message.author.id == message.guild.owner.id && message.author.id == config.OWNER_ID) number = 10;
      else number = 0;    
    if(permissions == number) return true;
      else return false;
  }
}