import { Router } from "express";
import { createAuthor } from "../controllers/saveAuthor.controllers";
import { validarRol } from "../../../shared/middlewares/validateRol";
import { getAllAuthores, getAuthorById, getAuthorByName } from "../controllers/findAuthor.controllers";
import { deleteAuthorById } from "../controllers/deleteAuthor.controllers";
import { updataAuthors } from "../controllers/updateAuthor.controllers";
import multer from "multer";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { getMetadata } from "../controllers/getMetadata.controllers";

export const autorRoutes = Router();
const upload = multer({ dest: "uploads/" });

autorRoutes.post(
  "/author/create",
  upload.single("avatar"),
  createAuthor
);
autorRoutes.get("/author", getAuthorByName);
autorRoutes.get("/AllAuthores", getAllAuthores);
autorRoutes.get("/author/:id", getAuthorById);
autorRoutes.delete("/author/:id", validateJWT, validarRol("Admin"), deleteAuthorById);
autorRoutes.put("/author/:id", validateJWT, validarRol("Admin"), upload.single("avatar"), updataAuthors);
autorRoutes.get("/metadata", validateJWT, getMetadata);

