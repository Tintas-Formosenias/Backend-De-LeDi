import { Schema, Types, model } from "mongoose";
import { IMetric } from "../../../shared/types/metricTypes/metric";

const metric = new Schema<IMetric>({
  type: {
    type: String,
    required: true,
    enum: ["book", "author", "subgenre", "format"],
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  segmentType: {
    type: String,
    required: true,
    enum: ["day", "month", "year"],
  },
  timeSegmentValue: {
    type: String,
    required: true,
  },
  idBook: { type: Types.ObjectId, ref: "Books" },
  idAuthor: { type: Types.ObjectId, ref: "AuthorModel" },
  subgenre: { type: String },
  format: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

metric.index(
  { type: 1, segmentType: 1, timeSegmentValue: 1, idBook: 1, idAuthor: 1, subgenre: 1, format: 1 },
  { unique: true }
);

export const MetricModel = model("Metric", metric, "Metrics");
