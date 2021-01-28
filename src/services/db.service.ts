import { IUserSchema, IUserSchemaObj } from "../schemas/IUserSchema";
import UserSchema from '../schemas/UserSchema';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/tsnode", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.log(error));

export default new class DbService {
  public async wrapperUser(body:IUserSchemaObj): Promise<object> {
    const user = await UserSchema.create(body);
    console.log(`[DB] Usuario: ${user.username}(${user._id}) [USERCREATE]`);
    return user;
  }

  public async findUser(body): Promise<object> {
    const user = await UserSchema.findOne(body);
    if (!user) return;
    console.log(`[DB] Usuario: ${user.username}(${user._id}) [USERFIND]`);
    return user;
  }

  public async deleteUser(body): Promise<object> {
    const user = await UserSchema.deleteOne(body);
    if (!user) return;
    console.log(`[DB] Usuario: ${user.username}(${user._id}) [USERDELETE]`);
    return user;
  }
};