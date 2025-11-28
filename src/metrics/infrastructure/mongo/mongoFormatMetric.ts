import { GetMetricFormatRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoFormatMetric implements GetMetricFormatRepository {
  async getFormatMetricByDay(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "format", segmentType: "day" })
      .sort({ count: -1 })
      .limit(10);
  }

  async getFormatMetricByMonth(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "format", segmentType: "month" })
      .sort({ count: -1 })
      .limit(10);
  }

  async getFormatMetricByYear(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "format", segmentType: "year" })
      .sort({ count: -1 })
      .limit(10);
  }
}
