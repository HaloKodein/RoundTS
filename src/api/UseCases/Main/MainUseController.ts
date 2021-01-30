import { ClientUser } from "discord.js";
import { Request, Response} from "express";
import { MainUseCase } from "./MainUse";
import { IMainUser } from "./IMainInfos";

export class mainController {
  constructor(
    private MainUseCase
  ){}

  static async handler(req:Request, res:Response): Promise<Response> {
    const infos = await MainUseCase.getInfos();
    const user:IMainUser = await req.user;
    return res.status(200).json({
      name: infos.username,
      users: infos.users,
      guilds: infos.guilds,
      invite: infos.invite,
      user: req.user ? {
        id: user.id,
        username: user.username,
      } : undefined,
    });
  }
}