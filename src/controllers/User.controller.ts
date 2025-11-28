import { Response, Request } from "express";
import logger from "../utils/logger";
import { User } from "../schema/User.schema";
import bycript from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../utils/create-user-token";
import { RequestUser } from "../types/requestUserId";
import { getToken } from "../utils/get-token";
import { CONNREFUSED } from "dns";
import { getUserByToken } from "../utils/get-user-by-token";

//Criacao do fluxo registro do user
export const register = async (req: Request, res: Response) => {
  const { name, email, phone, password, confirmpassword } = req.body;

  if (!name) {
    res.status(422).json({ message: "Name is required!" });
    return;
  }

  if (!email) {
    res.status(422).json({ message: "Email is required!" });
    return;
  }

  if (!phone) {
    res.status(422).json({ message: "Phone is required!" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "Password is required!" });
    return;
  }

  if (!confirmpassword) {
    res.status(422).json({ message: "The confirm password is required!" });
    return;
  }

  if (password !== confirmpassword) {
    res
      .status(422)
      .json({ message: "Password and the confirm Password is not the same" });
    return;
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res
      .status(422)
      .json({ message: "Please, use another email because is already using" });
    return;
  }

  const salt = await bycript.genSalt(12);
  const passwordHash = await bycript.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    phone: phone,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();

    await createUserToken(newUser, req, res);
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ error: "Error to register a user in the system" });
  }
};

//Criacao do fluxo de login do user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json({ message: "Email is required!" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "Password is required!" });
    return;
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(422).json({
      message: "This user is not in our system with this email",
    });
    return;
  }

  const checkPassword = await bycript.compare(password, user.password);

  if (!checkPassword) {
    res.status(422).json({
      message: "This password is invalid",
    });
    return;
  }

  await createUserToken(user, req, res);
};

export const checkUser = async (req: RequestUser, res: Response) => {
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
    const decoded = jwt.verify(token, process.env.SECRET) as JwtPayload;

    req.userId = decoded.id;

    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

export const getByIdUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");

  if (!user) {
    res.status(404).json({ message: "This id was not found in our system" });
    return;
  }

  res.status(200).json(user);
};

export const updateUser = async (req: RequestUser, res: Response) => {
  const { name, email, phone, password, confirmpassword } = req.body;
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    res.status(404).json({ message: "This user was not found" });
    return;
  }

  if (!name) {
    res.status(422).json({ message: "Name is required!" });
    return;
  }

  user!.name = name;

  if (!phone) {
    res.status(422).json({ message: "Phone is required!" });
    return;
  }

  user!.phone = phone;

  if (!password) {
    res.status(422).json({ message: "Password is required!" });
    return;
  }

  if (!confirmpassword) {
    res.status(422).json({ message: "The confirm password is required!" });
    return;
  }

  if (password !== confirmpassword) {
    res
      .status(422)
      .json({ message: "Password or the confirm Password is not the same" });
    return;
  } else if (password === confirmpassword && password !== null) {
    const salt = await bycript.genSalt(12);
    const passwordHash = await bycript.hash(password, salt);

    user!.password = passwordHash;
  }

  if (!email) {
    res.status(422).json({ message: "Email is required!" });
    return;
  }

  const userExists = await User.findOne({ email: email });

  if (user !== email && userExists) {
    res
      .status(422)
      .json({ message: "Please, use another email because is already using" });
    return;
  }

  user!.email = email;

  try {
    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      { $set: user },
      { new: true }
    );

    res.status(200).json({ message: "The user was update with sucess" });
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
};

export const deleteUser = async (req: RequestUser, res: Response) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token undefined or invalid!" });
  }

  const user = await getUserByToken(token);

  if (!user) {
    res.status(404).json({ message: "This user was not found" });
    return;
  }

  try {
    await User.findByIdAndDelete(user._id);

    res.status(200).json({ message: "This user was deleted with sucess" });
  } catch (error) {
    res.status(404).json({ message: "Error to delete this user" });
    return;
  }
};
