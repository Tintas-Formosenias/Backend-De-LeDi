import { MetricModel } from "../model/metricModel"
import { GetMetricUsersRepository } from "../../domain/repository/get/getMetricRepository"
import { IMetric } from "../../../shared/types/metricTypes/metric"
import { ITopUserMetric } from "../../../shared/types/metricTypes/topUsersMetric"
import { UserModel } from "../../../userService/infrastructure/models/userModels"

export class MongoUsersMetric implements GetMetricUsersRepository {

    async getUsersMetricByYear(): Promise<IMetric[]> {
        return await MetricModel.find({ type: "user", segmentType: "year" });
    }

    async getTopUsersByPoints(): Promise<ITopUserMetric[]> {
        return await UserModel
            .find()
            .sort({ point: -1 })
            .limit(5)
            .select('userName name lastName point avatar nivel imgLevel')
            .lean()
            .exec();
    }
}

