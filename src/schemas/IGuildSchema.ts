import { Document } from "mongoose";

export interface IGuildOwner {
  id?: string,
  username?: string
}

export interface IGuildSchemaObj {
  _id?: string,
  prefix?: string,
  plus?: boolean,
  name?: string,
  blacklist: string[],
  owner?: IGuildOwner
}

export interface IGuildSchema extends Document {
  _id?: string,
  prefix?: string,
  plus?: boolean,
  name?: string,
  blacklist: string[],
  owner?: IGuildOwner
}