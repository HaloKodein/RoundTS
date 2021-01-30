export interface IMainUser {
  id?: string,
  username?: string,
  avatar?: string
}

export interface IMainInfos {
  users: number,
  guilds: number,
  username: string,
  invite: string,
  user?: IMainUser
}