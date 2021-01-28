import fs from 'fs';
import { Client } from 'discord.js';
import Log from '../utils/log';

export default new class EventService {
  constructor(){}

  public async startEvents(client:Client):Promise<void> {
    await fs.readdir("./src/events/", async (err, files) => {
      files.forEach(async evt => {
        if (err) return Log.error(`${evt}: ${err}`, "EVENTS");
        if (evt.split('.').slice(-1)[0] !== 'ts') return;
        const eventName = evt.split('.')[0];
        const event = await import(`../events/${evt}`);
        client.on(eventName, event.bind(null, client));
        Log.info(`Carregando ${evt}`, "EVENTS");
      });
    });
  }
}
