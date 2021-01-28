import { Document } from 'mongoose';

export interface IUserSchema extends Document {
  _id: string,
  username: string,
  economy: {
    money: number,
    rep: number,
    badges: string[],
    backgrounds: string[],
  }
}

export interface IUserSchemaObj {
  _id: string,
  username: string,
  economy: {
    money: number,
    rep: number,
    badges: string[],
    backgrounds: string[],
  }
}