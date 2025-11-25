import { BooksCrudRepository } from "../../domain/booksCrudRepository";
import { Books } from "../../domain/entities/books";
import { BookModel } from "../model/books.model";
import { Types } from "mongoose";
import { extractTextByPage } from "../../../shared/utils/pdfService";
import { serviceContainer } from "../../../shared/services/serviceContainer";

import { EmbeddingApps } from "../../../ai/applications";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { EmbeddingModel } from "../../../ai/infrastructure/model/embeddingModel";
import { EmbeddingDriver } from "../../../ai/infrastructure/embedding.driver";



const embeddingDriver = new EmbeddingDriver();
const embedding = new EmbeddingApps(embeddingDriver);

export class MongoCrudRepository implements BooksCrudRepository {
  //  ✅
  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);
    const result = await newBook.save();
    const id: Types.ObjectId = result._id as Types.ObjectId;
    if (result.genre === "Narrativo") {
      const url = result.contentBook.url_secura;
      const text = await extractTextByPage(url);
      const title = result.title;
      await serviceContainer.bookContent.createBookContent.run(id, title, text);
    }

    await embedding.create384(`${id}, ${result.title}, ${result.summary}, ${result.synopsis}`);

  }

  //  ✅
  async updateBookById(id: Types.ObjectId, book: Books): Promise<void> {
    const result = await BookModel.findByIdAndUpdate(id, book);
    if (result) {
      if (result.genre === "Narrativo") {
        const url = result.contentBook.url_secura;
        const text = await extractTextByPage(url);
        const title = result.title;
        await serviceContainer.bookContent.createBookContent.run(id, title, text);
      }
      await EmbeddingModel.deleteMany({ bookId: id });

      await embedding.create384(`${id}, ${result.title}, ${result.summary}, ${result.synopsis}`);

    }
  }

  //  ✅
  async getAllBooks(): Promise<BookSearch[]> {
    const books = await BookModel.find().populate("author", "fullName").sort({ createdAt: -1 });

    return books;
  }

  //  ✅
  async deleteBook(id: Types.ObjectId): Promise<BookSearch | null> {
    await EmbeddingModel.deleteMany({ bookId: id });

    return await BookModel.findByIdAndDelete(id);
  }

  //  ✅
  async getBookById(id: Types.ObjectId): Promise<BookSearch | null> {
    const book: BookSearch | null = await BookModel.findById(id).populate("author", "fullName");

    if (!book) return null;

    return book;
  }
}
