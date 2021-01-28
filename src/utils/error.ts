import Discord, { Client, TextChannel } from 'discord.js';
import config from '../config';

export default new class SendError {
  public async sendChannelError(message: string, channel:TextChannel): Promise<void> {
    const error = new Discord.MessageEmbed()
    .setTitle("Erro!")
    .setDescription(message)
    .setColor("RED")
    .setFooter(channel.client.user.username, channel.client.user.displayAvatarURL({dynamic:true}));
    
    channel.send(error);
  }

  public async sendOwnerError(message: string, client: Client): Promise<void> {
    const owner = client.users.cache.get(config.OWNER_ID)
    const error = new Discord.MessageEmbed()
    .setTitle("Erro!")
    .setDescription(message)
    .setColor("RED")
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}));
    
    owner.send(error);
  }
}