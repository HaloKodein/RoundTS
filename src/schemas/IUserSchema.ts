import { Document } from 'mongoose';

export interface IUserSchema extends Document {
  _id: string,
  username: string,
  admin: boolean,
  money: number,
  rep: number,
  badges: string[],
  backgrounds: string[],
}

interface badge extends Array<badge> {
  url: string,
  name: string,
  emoji: string
}

export interface IUserSchemaObj {
  _id?: string,
  username?: string,
  admin?: boolean,
  money?: number,
  rep?: number,
  badges?: badge,
  backgrounds?: string[],
}
