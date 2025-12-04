import { News } from "../../domain/entities/news.entity";
import { ICrudRepository } from "../../domain/ports/crud.repository";

export class CreateNews {
    constructor(private readonly newsRepo: ICrudRepository) { }

    async execute(news: News): Promise<News> {
        return await this.newsRepo.createNews(news);
    }
}