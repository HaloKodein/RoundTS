import { Client } from 'discord.js';
import config from '../config';
import CommandService from './command-service';
import EventService from './event-service';

export default class EventsHandler {
  constructor(private client: Client){  
    EventService.startEvents(client);
    CommandService.startCommands();
    client.login(config.TOKEN);
  }
}
