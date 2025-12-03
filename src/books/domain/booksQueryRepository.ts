import { Types } from "mongoose";
import { BookSearch } from "../../shared/types/bookTypes/bookTypes";

export interface BooksQueryRepository {
     getIntelligenceBook(query: string[], level?: string): Promise<BookSearch[]>;
     getContentBookById(id: Types.ObjectId): Promise<string | null>;
     getAllBooksByLevel(nivel?: string): Promise<BookSearch[]>;
     getBooksByFiltering(
          theme: string[],
          subgenre: string[],
          yearBook: string[],
          genre: string[],
          format: string[],
          idAuthor: string[],
          level?: string
     ): Promise<BookSearch[]>;
     getBooksByIds(ids: Types.ObjectId[]): Promise<BookSearch[]>;
}