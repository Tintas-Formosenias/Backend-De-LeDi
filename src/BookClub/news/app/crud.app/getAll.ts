import { ICrudRepository } from "../../domain/ports/crud.repository";
import { News } from "../../domain/entities/news.entity";

export class GetAllNews {
    constructor(private readonly newsRepo: ICrudRepository) { }

    async execute(): Promise<News[]> {
        return await this.newsRepo.findNews();
    }
}