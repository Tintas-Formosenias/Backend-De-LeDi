import { GamificationRepository } from "../infrastructure/GamificationRepository";

export class AwardBestReader {
    constructor(private readonly repository: GamificationRepository) { }

    async run(): Promise<void> {
        await this.repository.awardBestReaderMedal();
    }
}
