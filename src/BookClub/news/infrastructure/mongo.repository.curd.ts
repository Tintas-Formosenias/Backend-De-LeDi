import NewsModel from "./model/newsModel";
import { ICrudRepository } from "../domain/ports/crud.repository";
import { News } from "../domain/entities/news.entity";

export class MongoRepository implements ICrudRepository {
    async createNews(news: News): Promise<News> {
        return await NewsModel.create(news);
    }
    async findNews(): Promise<News[]> {
        return await NewsModel.find();
    }
    async findById(id: string): Promise<News | null> {
        return await NewsModel.findById(id);
    }
    async updateNews(id: string, news: Partial<News>): Promise<News | null> {
        return await NewsModel.findByIdAndUpdate(id, news);
    }
    async deleteNews(id: string): Promise<void> {
        await NewsModel.findByIdAndDelete(id);
    }
}

