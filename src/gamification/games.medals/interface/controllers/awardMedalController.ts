import { Request, Response } from "express";
import { AwardBestReader } from "../../application/AwardBestReader";
import { GamificationRepository } from "../../infrastructure/GamificationRepository";

const gamificationRepository = new GamificationRepository();
const awardBestReader = new AwardBestReader(gamificationRepository);

export const awardBestReaderController = async (_req: Request, res: Response): Promise<void> => {
    try {
        await awardBestReader.run();
        res.status(200).json({ msg: "Best reader medal awarded successfully (if applicable)." });
    } catch (error) {
        console.error("Error awarding best reader medal:", error);
        res.status(500).json({ msg: "Internal server error." });
    }
};
