import { Schema, model } from "mongoose";
import { IBadgeSchema } from "./IBadgeSchema";

const BadgeSchema = new Schema({
  url: String,
  name: String,
  emoji: String
}, {
  timestamps: true
});

export default model<IBadgeSchema>("Badge", BadgeSchema);