import { News } from "../entities/news.entity";

export interface ICrudRepository {
    createNews(news: News): Promise<News>;
    findNews(): Promise<News[]>;
    findById(id: string): Promise<News | null>;
    updateNews(id: string, news: Partial<News>): Promise<News | null>;
    deleteNews(id: string): Promise<void>;
}