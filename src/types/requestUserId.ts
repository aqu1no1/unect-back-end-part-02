import { Request } from "express";
import IUser from "../models/User.model";

export interface RequestUser extends Request {
  userId?: string;
  user?: IUser | null;
}
