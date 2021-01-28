import Discord from 'discord.js';
import EventsHandler from './services/handler-events';
const events = new EventsHandler(new Discord.Client());
