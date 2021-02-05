import { Document } from "mongoose";

export interface IBadgeSchemaObj {
  url: string,
  name: string,
  emoji: string
}

export interface IBadgeSchema extends Document {
  url: string,
  name: string,
  emoji: string
}