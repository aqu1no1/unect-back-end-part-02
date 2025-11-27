import { Types } from "mongoose";

interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;
