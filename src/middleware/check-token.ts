import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestUser } from "../types/requestUserId";
import { getToken } from "../utils/get-token";
import { User } from "../schema/User.schema";

export const checkToken = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  if (!process.env.SECRET) {
    throw new Error("SECRET not found in .env");
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET) as JwtPayload;
    req.userId = verified.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};
