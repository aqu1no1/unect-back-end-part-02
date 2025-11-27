import jwt from "jsonwebtoken";
import IUser from "../models/User.model";
import { Response, Request } from "express";

export const createUserToken = async (
  user: IUser,
  req: Request,
  res: Response
) => {
  if (!process.env.SECRET) {
    throw new Error("Your SECRET not found in your env.");
  }

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.SECRET
  );

  res.status(200).json({
    message: "You are authenticated now",
    token: token,
    userId: user._id,
  });
};
