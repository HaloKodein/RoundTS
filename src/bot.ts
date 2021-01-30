import Discord from 'discord.js';
import EventsHandler from './services/handler-events';
const client = new Discord.Client();
const events = new EventsHandler(client);

export { client };