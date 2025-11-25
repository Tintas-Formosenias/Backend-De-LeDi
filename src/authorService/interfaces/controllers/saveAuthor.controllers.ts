import { Request, Response } from "express";
import { CreateAuthor } from "../../app/service/SaveAuthor.service";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";
import { findAuthorMongoRepo, SaveAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { authorValidation } from "../../app/validations/authorValidations";
import { UploadAuthorService } from "../../../shared/services/upload_Author.Service";

const saveAuthorMongo: ISaveAuthorRepository = new SaveAuthorMongoRepo();
const findAuthorRepo = new findAuthorMongoRepo();

const authorService = new CreateAuthor(saveAuthorMongo, findAuthorRepo);

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author: Author = req.body;
    const file = req.file;
    console.log(author)

    const parsed = authorValidation(author);

    if (!parsed.success) {
      console.log({
        message: "Datos de usuario inválidos",
        errors: parsed.errors.map(error => ({
          field: error.path.join('.'),
          message: error.message
        })),
        status: 400
      })
      res.status(400).json({
        success: false,
        message: "Datos de usuario inválidos",
        errors: parsed.errors.map(error => ({
          field: error.path.join('.'),
          message: error.message
        })),
        status: 400
      });

      return;
    }

    const avatar = await UploadAuthorService.uploadAuthor(file as Express.Multer.File);
    const newAuthor = { ...author, avatar };

    const result = await authorService.saveAuthors(newAuthor);

    if (!result) {
      await deleteCoverImage(avatar.id_image);
      res.status(409).json({ msg: "the author already exist" });
      return;
    }

    res.status(201).json({ msg: "the author save successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "the internal server error" });
  }
};
