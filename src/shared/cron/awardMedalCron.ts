import { GamificationRepository } from "../../gamification/games.medals/infrastructure/GamificationRepository";
import { AwardBestReader } from "../../gamification/games.medals/application/AwardBestReader";

const gamificationRepository = new GamificationRepository();
const awardBestReader = new AwardBestReader(gamificationRepository);

export const initCronJobs = () => {
    let currentYear = new Date().getFullYear();
    let targetDate = new Date(currentYear, 11, 31, 23, 59, 0);

    setInterval(async () => {
        const now = new Date();

        if (now > targetDate) {
            console.log("Running Best Reader Award Cron Job...");
            try {
                await awardBestReader.run();
                console.log("Best Reader Award Cron Job completed.");
            } catch (error) {
                console.error("Error running Best Reader Award Cron Job:", error);
            }

            currentYear++;
            targetDate = new Date(currentYear, 11, 31, 23, 59, 0);
        }
    }, 60000);


};
