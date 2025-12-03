import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksQueryRepository } from "../../domain/booksQueryRepository";


export class GetBooksByFiltering {

  constructor(private repository: BooksQueryRepository) { }

  async run(theme: string[], subgenre: string[], yearBook: string[], genre: string[], format: string[], idAuthor: string[], level?: string): Promise<BookSearch[]> {
    return await this.repository.getBooksByFiltering(theme, subgenre, yearBook, genre, format, idAuthor, level);
  }

}
