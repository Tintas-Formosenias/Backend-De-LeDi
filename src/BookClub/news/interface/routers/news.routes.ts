import { Router } from "express";
import { CrudController } from "../controllers/crud.controller";
import upload from "../../../../shared/middlewares/storage";
import { validateJWT } from "../../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../../shared/middlewares/validateRol";

const newsRouter = Router();
const crudController = new CrudController();

newsRouter.post(
    "/createNews",
    validateJWT,
    validarRol("Admin"),
    upload.single("img"),
    crudController.createNews.bind(crudController)
);

newsRouter.get("/getAllNews", crudController.getAllNews.bind(crudController));

newsRouter.put(
    "/updateNews/:id",
    validateJWT,
    validarRol("Admin"),
    upload.single("img"),
    crudController.updateNews.bind(crudController)
);

newsRouter.delete(
    "/deleteNews/:id",
    validateJWT,
    validarRol("Admin"),
    crudController.deleteNews.bind(crudController)
);

export { newsRouter };
