import { IMetric } from "../../../../shared/types/metricTypes/metric";
import { ITopUserMetric } from "../../../../shared/types/metricTypes/topUsersMetric";

export interface GetMetricBookRepository {
  getBookMetricByDay(): Promise<IMetric[]>;
  getBookMetricByMonth(): Promise<IMetric[]>;
  getBookMetricByYear(): Promise<IMetric[]>;
}

export interface GetMetricSubgenreRepository {
  getSubgenreMetricByDay(): Promise<IMetric[]>;
  getSubgenreMetricByMonth(): Promise<IMetric[]>;
  getSubgenreMetricByYear(): Promise<IMetric[]>;
}

export interface GetMetricFormatRepository {
  getFormatMetricByDay(): Promise<IMetric[]>;
  getFormatMetricByMonth(): Promise<IMetric[]>;
  getFormatMetricByYear(): Promise<IMetric[]>;
}

export interface GetMetricAuthorRepository {
  getAuthorMetricByDay(): Promise<IMetric[]>;
  getAuthorMetricByMonth(): Promise<IMetric[]>;
  getAuthorMetricByYear(): Promise<IMetric[]>;
}

export interface GetMetricUsersRepository {
  getUsersMetricByYear(): Promise<IMetric[]>;
  getTopUsersByPoints(): Promise<ITopUserMetric[]>;
}
