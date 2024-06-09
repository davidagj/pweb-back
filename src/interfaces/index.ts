import { Request } from "express"
import { IUser } from '../schemas/user';

export interface AuthRequest extends Request {
  user: IUser;
}