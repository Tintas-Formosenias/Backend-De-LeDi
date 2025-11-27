import mongoose, { Schema } from "mongoose";
import { Author } from "../../domain/entidades/author.Types";

const AuthorSchema = new Schema<Author>({
  fullName: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  birthplace: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  itActivo: {
    type: Boolean,
    required: true,
  },
  writingGenre: [
    {
      type: String,
      required: true,
    },
  ],
  avatar: {
    id_image: { type: String, required: true },
    url_secura: { type: String, required: true },
  },
});

export const AuthorModel = mongoose.model<Author>("AuthorModel", AuthorSchema);
