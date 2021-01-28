import { IUserSchema, IUserSchemaObj } from "../schemas/IUserSchema";
import { IGuildSchema, IGuildSchemaObj } from '../schemas/IGuildSchema';
import UserSchema from '../schemas/UserSchema';
import GuildSchema from '../schemas/GuildSchema';
import mongoose from 'mongoose';
import Log from '../utils/log';

mongoose.connect("mongodb://localhost:27017/tsnode", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => Log.info("Conectada com sucesso", "DATABASE")).catch(error => Log.error(error, "DATABASE"));

export default new class DbService {
  public async wrapperUser(body:IUserSchemaObj): Promise<object> {
    const user = await UserSchema.create(body);
    return user;
  }

  public async findUser(body): Promise<object> {
    const user = await UserSchema.findOne(body);
    if (!user) return;
    return user;
  }

  public async deleteUser(body): Promise<object> {
    const user = await UserSchema.deleteOne(body);
    if (!user) return;
    return user;
  }

  public async wrapperGuild(body:IGuildSchemaObj): Promise<object> {
    const guild = await GuildSchema.create(body);
    return guild;
  }

  public async findGuild(body): Promise<object> {
    const guild = await GuildSchema.findOne(body);
    if (!guild) return;
    return guild;
  }

  public async deleteGuild(body): Promise<object> {
    const guild = await GuildSchema.deleteOne(body);
    if (!guild) return;
    return guild;
  }
};
