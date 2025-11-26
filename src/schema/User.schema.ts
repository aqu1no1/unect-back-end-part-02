import mongoose, { Schema } from "mongoose";
import IUser from "../models/User.model";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, maxLength: 256 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxLength: 256 },
    phone: { type: String, required: true, maxLength: 11 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
