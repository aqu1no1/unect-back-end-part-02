import mongoose, { Schema } from "mongoose";
import IPet from "../models/Pet.model";

const petSchema = new Schema<IPet>(
  {
    name: { type: String, required: true, maxLength: 256 },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    available: { type: Boolean, default: true },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    adopter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export const Pet = mongoose.model<IPet>("Pet", petSchema);
