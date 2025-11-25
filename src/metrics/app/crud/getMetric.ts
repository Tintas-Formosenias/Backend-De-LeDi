import { IMetric } from "../../../shared/types/metricTypes/metric";
import { ITopUserMetric } from "../../../shared/types/metricTypes/topUsersMetric";
import {
  GetMetricAuthorRepository,
  GetMetricBookRepository,
  GetMetricFormatRepository,
  GetMetricSubgenreRepository,
  GetMetricUsersRepository,
} from "../../domain";

export class GetBookMetric {
  constructor(private repository: GetMetricBookRepository) { }

  async day(): Promise<IMetric[]> {
    return await this.repository.getBookMetricByDay();
  }

  async month(): Promise<IMetric[]> {
    return await this.repository.getBookMetricByMonth();
  }

  async year(): Promise<IMetric[]> {
    return await this.repository.getBookMetricByYear();
  }
}

export class GetSubgenreMetric {
  constructor(private repository: GetMetricSubgenreRepository) { }

  async day(): Promise<IMetric[]> {
    return await this.repository.getSubgenreMetricByDay();
  }

  async month(): Promise<IMetric[]> {
    return await this.repository.getSubgenreMetricByMonth();
  }

  async year(): Promise<IMetric[]> {
    return await this.repository.getSubgenreMetricByYear();
  }
}

export class GetFormatMetric {
  constructor(private repository: GetMetricFormatRepository) { }

  async day(): Promise<IMetric[]> {
    return await this.repository.getFormatMetricByDay();
  }

  async month(): Promise<IMetric[]> {
    return await this.repository.getFormatMetricByMonth();
  }

  async year(): Promise<IMetric[]> {
    return await this.repository.getFormatMetricByYear();
  }
}

export class GetAuthorMetric {
  constructor(private repository: GetMetricAuthorRepository) { }

  async day(): Promise<IMetric[]> {
    return await this.repository.getAuthorMetricByDay();
  }

  async month(): Promise<IMetric[]> {
    return await this.repository.getAuthorMetricByMonth();
  }

  async year(): Promise<IMetric[]> {
    return await this.repository.getAuthorMetricByYear();
  }
}

export class GetUsersMetric {
  constructor(private repository: GetMetricUsersRepository) { }

  async year(): Promise<IMetric[]> {
    return await this.repository.getUsersMetricByYear();
  }

  async topUsersByPoints(): Promise<ITopUserMetric[]> {
    return await this.repository.getTopUsersByPoints();
  }
}
