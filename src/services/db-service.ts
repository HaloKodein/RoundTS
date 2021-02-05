import { IUserSchema, IUserSchemaObj } from "../schemas/IUserSchema";
import { IGuildSchema, IGuildSchemaObj } from '../schemas/IGuildSchema';
import { IBadgeSchema, IBadgeSchemaObj } from '../schemas/IBadgeSchema';
import UserSchema from '../schemas/UserSchema';
import GuildSchema from '../schemas/GuildSchema';
import BadgeSchema from '../schemas/BadgeSchema';
import mongoose from 'mongoose';
import Log from '../utils/log';

mongoose.connect("mongodb://localhost:27017/tsround", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => Log.info("Conectada com sucesso", "DATABASE")).catch(error => Log.error(error, "DATABASE"));

export default new class DbService {
  public async wrapperUser(body:IUserSchemaObj): Promise<IUserSchemaObj> {
    const user = await UserSchema.create(body);
    return user;
  }

  public async findUser(body): Promise<IUserSchemaObj> {
    const user = await UserSchema.findOne(body);
    if (!user) return;
    return user;
  }

  public async updateUser(body, update): Promise<IUserSchemaObj> {
    const user = await UserSchema.findOneAndUpdate(body, update, { new: true });
    if (!user) return;
    return user;
  }

  public async deleteUser(body): Promise<object> {
    const user = await UserSchema.deleteOne(body);
    if (!user) return;
    return user;
  }

  public async wrapperGuild(body:IGuildSchemaObj): Promise<IGuildSchemaObj> {
    const guild = await GuildSchema.create(body);
    return guild;
  }

  public async findGuild(body): Promise<IGuildSchemaObj> {
    const guild = await GuildSchema.findOne(body);
    if (!guild) return;
    return guild;
  }

  public async updateGuild(body, update): Promise<IGuildSchemaObj> {
    const guild = await GuildSchema.findOneAndUpdate(body, update, { new: true });
    if (!guild) return;
    return guild;
  }

  public async deleteGuild(body): Promise<object> {
    const guild = await GuildSchema.deleteOne(body);
    if (!guild) return;
    return guild;
  }

  public async wrapperBadge(body:IBadgeSchemaObj): Promise<IBadgeSchemaObj> {
    const badge = await BadgeSchema.create(body);
    return badge;
  }

  public async findBadge(body): Promise<IBadgeSchemaObj> {
    const badge = await BadgeSchema.findOne(body);
    if (!badge) return;
    return badge;
  }

  public async updateBadge(body, update): Promise<IBadgeSchemaObj> {
    const badge = await BadgeSchema.findOneAndUpdate(body, update, { new: true });
    if (!badge) return;
    return badge;
  }

  public async deleteBadge(body): Promise<object> {
    const badge = await BadgeSchema.deleteOne(body);
    if (!badge) return;
    return badge;
  }
};
