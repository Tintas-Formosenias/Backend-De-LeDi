import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { Types } from "mongoose";

export class GamificationRepository {
    async awardBestReaderMedal(): Promise<void> {
        const bestReaderMedalId = new Types.ObjectId("6920bd85490e36f5dd0332ba");

        // Find the user with the most points
        const topUser = await UserModel.findOne().sort({ point: -1 });

        if (topUser) {
            // Check if user already has the medal to avoid duplicates
            const hasMedal = topUser.medals.some((medalId: Types.ObjectId) => medalId.toString() === bestReaderMedalId.toString());

            if (!hasMedal) {
                topUser.medals.push(bestReaderMedalId);
                await topUser.save();
                console.log(`Awarded Best Reader medal to user: ${topUser.userName}`);
            } else {
                console.log(`User ${topUser.userName} already has the Best Reader medal.`);
            }
        } else {
            console.log("No users found to award medal.");
        }
    }
}
