import mongoose, { Schema } from "mongoose";
import IUser from "../models/User.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *         - confirmpassword
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f4d7fcab6c2e8b126c0f31
 *         name:
 *           type: string
 *           maxLength: 256
 *           example: João Silva
 *         email:
 *           type: string
 *           example: joao@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 *         confirmpassword:
 *           type: string
 *           example: 123456
 *         phone:
 *           type: string
 *           maxLength: 11
 *           example: 11987654321
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-15T12:15:40.499Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-15T12:15:40.499Z
 */
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
