import database from '../services/db.service';

export = async (client) => {
  console.log("Estou online");
    client.users.cache.map(async e => {
    if (e.bot) return;
    const result = await database.findUser({_id:e.id});
    if (result) return;
    database.wrapperUser({
      _id: e.id,
      username: e.username,
      economy: {
        money: 0,
        rep: 0,
        backgrounds: [],
        badges: []
      }
    });
  });
}