import { ICrudRepository } from "../../domain/ports/crud.repository";

export class DeleteNews {
    constructor(private readonly newsRepo: ICrudRepository) { }

    async execute(id: string): Promise<void> {
        await this.newsRepo.deleteNews(id);
    }
}
