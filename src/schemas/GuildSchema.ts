import { Schema, model } from 'mongoose';
import { IGuildSchema } from './IGuildSchema';

const GuildSchema = new Schema({
  _id: String,
  prefix: String,
  plus: Boolean,
  name: String,
  blacklist: Array,
  owner: {
    id: String,
    name: String
  }
}, {
  timestamps: true
})

export default model<IGuildSchema>("Guild", GuildSchema);