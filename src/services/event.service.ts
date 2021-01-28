import fs from 'fs';
import { Client } from 'discord.js';

export default new class EventService {
  constructor(){}

  public async startEvents(client:Client):Promise<void> {
    await fs.readdir("./src/events/", async (err, files) => {
      files.forEach(async evt => {
        if (err) return console.error(`Não foi possivel carregar o evento ${evt}: ${err}`);
        if (evt.split('.').slice(-1)[0] !== 'ts') return;
        const eventName = evt.split('.')[0];
        const event = await import(`../events/${evt}`);
        client.on(eventName, event.bind(null, client));
        console.log(`Carregando o evento ${evt}`);
      });
    });
  }
}