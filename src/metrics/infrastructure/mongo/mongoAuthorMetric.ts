import { GetMetricAuthorRepository } from "../../domain";
import { IMetric } from "../../../shared/types/metricTypes/metric";
import { MetricModel } from "../model/metricModel";

export class MongoAuthorsMetric implements GetMetricAuthorRepository {
  async getAuthorMetricByDay(): Promise<IMetric[]> {
    const metrics = await MetricModel.find({ type: "author", segmentType: "day", idAuthor: { $ne: null } })
      .populate("idAuthor", "fullName avatar")
      .sort({ count: -1 })
      .limit(20);

    return metrics.filter((metric) => metric.idAuthor).slice(0, 10);
  }

  async getAuthorMetricByMonth(): Promise<IMetric[]> {
    const metrics = await MetricModel.find({ type: "author", segmentType: "month", idAuthor: { $ne: null } })
      .populate("idAuthor", "fullName avatar")
      .sort({ count: -1 })
      .limit(20);

    return metrics.filter((metric) => metric.idAuthor).slice(0, 10);
  }

  async getAuthorMetricByYear(): Promise<IMetric[]> {
    const metrics = await MetricModel.find({ type: "author", segmentType: "year", idAuthor: { $ne: null } })
      .populate("idAuthor", "fullName avatar")
      .sort({ count: -1 })
      .limit(20);

    return metrics.filter((metric) => metric.idAuthor).slice(0, 10);
  }
}
