import mongoose, { Schema } from "mongoose";
import IPet from "../models/Pet.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - weight
 *         - color
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f4d7fcab6c2e8b126c0f31
 *         name:
 *           type: string
 *           maxLength: 256
 *           example: Thor
 *         age:
 *           type: number
 *           example: 3
 *         weight:
 *           type: number
 *           example: 18.4
 *         color:
 *           type: string
 *           example: marrom
 *         available:
 *           type: boolean
 *           example: true
 *         user:
 *           type: string
 *           description: ID do usuário dono do pet
 *           example: 65f4d7fcab6c2e8b126c0f31
 *         adopter:
 *           type: string
 *           nullable: true
 *           description: ID do usuário que adotou
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-15T12:15:40.499Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-15T12:15:40.499Z
 */
const petSchema = new Schema<IPet>(
  {
    name: { type: String, required: true, maxLength: 256 },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    available: { type: Boolean, default: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    adopter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export const Pet = mongoose.model<IPet>("Pet", petSchema);
