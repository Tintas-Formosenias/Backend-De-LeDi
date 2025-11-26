import mongoose, { Schema } from "mongoose";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";

const BookProgresSchema = new Schema<BookUserProgresRepo>(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    idBook: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },

    unit: {
      type: String,
      enum: ["page", "second", "pages", "seconds"],
      required: true,
    },
    position: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    percent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["reading", "finished", "pending", "abandoned"],
      default: "reading",
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    finishDate: {
      type: Date,
      default: Date.now,
    },
    UpdateLast: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

export const BookProgressModel = mongoose.model<BookUserProgresRepo>(
  "BookProgress",
  BookProgresSchema
);
