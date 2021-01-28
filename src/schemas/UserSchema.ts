import { Schema, model } from 'mongoose';
import { IUserSchema } from './IUserSchema';

const UserSchema = new Schema({
  _id: String,
  username: String,
  economy: {
    money: Number,
    rep: Number,
    badges: Array,
    backgrounds: Array,
  }
}, {
  timestamps: true
})

export default model<IUserSchema>("User", UserSchema);