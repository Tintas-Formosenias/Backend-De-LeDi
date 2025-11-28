import { GetMetricBookRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoBooksMetric implements GetMetricBookRepository {
  async getBookMetricByDay(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "book", segmentType: "day" })
      .populate("idBook", "title bookCoverImage")
      .sort({ count: -1 })
      .limit(10);
  }

  async getBookMetricByMonth(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "book", segmentType: "month" })
      .populate("idBook", "title bookCoverImage")
      .sort({ count: -1 })
      .limit(10);
  }

  async getBookMetricByYear(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "book", segmentType: "year" })
      .populate("idBook", "title bookCoverImage")
      .sort({ count: -1 })
      .limit(10);
  }
}
