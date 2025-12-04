import { ICrudRepository } from "../../domain/ports/crud.repository";
import { News } from "../../domain/entities/news.entity";

export class UpdateNews {
    constructor(private readonly newsRepo: ICrudRepository) { }

    async execute(id: string, news: Partial<News>): Promise<News | null> {
        return await this.newsRepo.updateNews(id, news);
    }
}