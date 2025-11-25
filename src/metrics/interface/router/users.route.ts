import { Request, Response, Router } from "express";
import { GetUsersMetricController } from "../controller/getUsersMetricController";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../shared/middlewares/validateRol";

export const usersMetricRouter = Router();
const controller = new GetUsersMetricController();

usersMetricRouter.get("/MetricUsers/year", validateJWT, validarRol("Admin"), async (req: Request, res: Response) => {
    await controller.getUsersMetricByYear(req, res);
});

usersMetricRouter.get("/MetricUsers/top", async (req: Request, res: Response) => {
    await controller.getTopUsersByPoints(req, res);
});
