import { MongoUsersMetric } from "../../infrastructure";
import { GetUsersMetric } from "../../app/crud/getMetric";
import { Request, Response } from "express";

const getMetric = new GetUsersMetric(new MongoUsersMetric());

export class GetUsersMetricController {
    async getUsersMetricByYear(_req: Request, res: Response): Promise<Response> {
        try {
            const result = await getMetric.year();

            if (result.length == 0) return res.status(404).json({ msg: "no hay métricas registradas" });

            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
        }
    }

    async getTopUsersByPoints(_req: Request, res: Response): Promise<Response> {
        try {
            const result = await getMetric.topUsersByPoints();

            if (result.length == 0) return res.status(404).json({ msg: "no hay usuarios registrados" });

            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "error inesperado por favor intente de nuevo" });
        }
    }
}
