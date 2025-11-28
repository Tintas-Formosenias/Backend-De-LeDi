import { GetMetricAuthorRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoAuthorsMetric implements GetMetricAuthorRepository {
  async getAuthorMetricByDay(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "author", segmentType: "day" })
      .populate("idAuthor", "fullName avatar")
      .sort({ count: -1 })
      .limit(10);
  }

  async getAuthorMetricByMonth(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "author", segmentType: "month" })
      .populate("idAuthor", "fullName avatar")
      .sort({ count: -1 })
      .limit(10);
  }

  async getAuthorMetricByYear(): Promise<IMetric[]> {
    return await MetricModel.find({ type: "author", segmentType: "year" })
      .populate("idAuthor", "fullName avatar")
      .sort({ count: -1 })
      .limit(10);
  }
}
