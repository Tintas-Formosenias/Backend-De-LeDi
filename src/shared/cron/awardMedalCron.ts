import cron from "node-cron";
import { GamificationRepository } from "../../gamification/games.medals/infrastructure/GamificationRepository";
import { AwardBestReader } from "../../gamification/games.medals/application/AwardBestReader";

const gamificationRepository = new GamificationRepository();
const awardBestReader = new AwardBestReader(gamificationRepository);

export const initCronJobs = () => {
    cron.schedule("59 23 31 12 *", async () => {
        console.log("Running Best Reader Award Cron Job...");
        try {
            await awardBestReader.run();
            console.log("Best Reader Award Cron Job completed.");
        } catch (error) {
            console.error("Error running Best Reader Award Cron Job:", error);
        }
    });

    console.log("Cron jobs initialized.");
};
