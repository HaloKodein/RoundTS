import { IMainInfos } from './IMainInfos';
import { client, database, log, error } from './index';

export class MainUseCase {
  static async getInfos(): Promise<IMainInfos> {
    const users = await client.users.cache.size,
    guilds = await client.guilds.cache.size,
    username = client.user.username,
    invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;

    return { users, guilds, username, invite };
  }
}