import { Types } from "mongoose";

interface IPet {
  _id?: string;
  name: string;
  age: number;
  weight: number;
  color: string;
  available: boolean;
  user: Types.ObjectId;
  adopter?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IPet;
