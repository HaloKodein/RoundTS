import Discord, { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import config from '../config';
import log from './log';

export default new class SendError {
  public async sendChannelError(message: string, channel:TextChannel): Promise<void> {
    const error = new Discord.MessageEmbed()
    .setAuthor("Erro", channel.client.user.displayAvatarURL({dynamic:true}))
    .setDescription(message)
    .setColor(config.utils.colors.error)
    .setFooter(channel.client.user.username);
    
    channel.send(error);
  }

  public async sendOwnerError(message: string, client: Client): Promise<void> {
    const owner = client.users.cache.get(config.owner)
    const error = new Discord.MessageEmbed()
    .setTitle("Erro!")
    .setDescription(message)
    .setColor("RED")
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}));
    
    owner.send(error);
  }

  public async sendChannel(title:string, description:string, message:Message): Promise<void> {
    const desc = description + " desculpe pelo erro, entre em contato com o meu desenvolvedor caso precise de ajuda.";
    const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(desc)
    .setColor("RED")
    .setFooter(message.client.user.username, message.client.user.displayAvatarURL({dynamic: true}));
    message.channel.send(embed);

    if (description.toLowerCase().includes("desativado"))
      log.info(`O usuário: ${message.author.username}(${message.author.id}) tentou usar um comando desativado!`);
    else
      log.info(`O usuário: ${message.author.username}(${message.author.id}) tentou usar um comando em manutenção!`);

  }
}