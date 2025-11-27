import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../schema/User.schema";

export const getUserByToken = async (token: string) => {
  if (!token) {
    return undefined;
  }

  if (!process.env.SECRET) {
    throw new Error("SECRET not found in .env");
  }

  const decoded = jwt.verify(token, process.env.SECRET) as JwtPayload;

  const userId = decoded.id;

  const user = await User.findById(userId);

  return user;
};
