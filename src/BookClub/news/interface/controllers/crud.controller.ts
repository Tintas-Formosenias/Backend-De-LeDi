import { CreateNews } from "../../app/crud.app/create";
import { DeleteNews } from "../../app/crud.app/delete";
import { GetAllNews } from "../../app/crud.app/getAll";
import { UpdateNews } from "../../app/crud.app/update";
import { News } from "../../domain/entities/news.entity";
import { MongoRepository } from "../../infrastructure/mongo.repository.curd";
import { Request, Response } from "express";
import { uploadNewsImage, deleteNewsImage } from "../../../../shared/utils/img/newsImg";
import { fileDelete } from "../../../../shared/utils/deleteFile";
import { validateNews } from "../validation/news.validation";

const newsRepo = new MongoRepository();
const createNews = new CreateNews(newsRepo);
const getAllNews = new GetAllNews(newsRepo);
const updateNews = new UpdateNews(newsRepo);
const deleteNews = new DeleteNews(newsRepo);

export class CrudController {

    async createNews(req: Request, res: Response) {
        try {
            const body = req.body;

            const validationResult = validateNews(body);
            if (!validationResult.success) {
                if (req.file) await fileDelete(req.file.path);
                res.status(400).json({ errors: validationResult.error.errors });
                return;
            }

            let imgData = undefined;

            if (req.file) {
                if (!req.file.mimetype.startsWith("image/")) {
                    await fileDelete(req.file.path);
                    res.status(400).json({ message: "Solo se permiten archivos de imagen" });
                    return;
                }

                const uploadResult = await uploadNewsImage(req.file.path);
                if (uploadResult) {
                    imgData = {
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id
                    };
                    await fileDelete(req.file.path);
                } else {
                    await fileDelete(req.file.path);
                    res.status(500).json({ message: "Error al subir la imagen" });
                    return;
                }
            }

            const news = new News(
                body.title,
                body.description,
                new Date(body.date),
                imgData
            );

            const createdNews = await createNews.execute(news);
            res.status(201).json({ message: "La noticia se creó correctamente", data: createdNews });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async getAllNews(req: Request, res: Response) {
        try {
            const news = await getAllNews.execute();
            res.status(200).json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async updateNews(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const body = req.body;

            const existingNews = await newsRepo.findById(id);
            if (!existingNews) {
                res.status(404).json({ message: "Noticia no encontrada" });
                return;
            }

            let imgData = existingNews.img;

            if (req.file) {
                // Validate file type (only images)
                if (!req.file.mimetype.startsWith("image/")) {
                    await fileDelete(req.file.path);
                    res.status(400).json({ message: "Solo se permiten archivos de imagen" });
                    return;
                }

                const uploadResult = await uploadNewsImage(req.file.path);
                if (uploadResult) {
                    if (existingNews.img && existingNews.img.public_id) {
                        await deleteNewsImage(existingNews.img.public_id);
                    }

                    imgData = {
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id
                    };
                    await fileDelete(req.file.path);
                } else {
                    await fileDelete(req.file.path);
                    res.status(500).json({ message: "Error al subir la nueva imagen" });
                    return;
                }
            }

            const newsToUpdate: Partial<News> = {
                ...body,
                img: imgData,
                ...(body.date ? { date: new Date(body.date) } : {})
            };

            const updatedNews = await updateNews.execute(id, newsToUpdate);
            res.status(200).json({ message: "La noticia se actualizó correctamente", data: updatedNews });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async deleteNews(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const existingNews = await newsRepo.findById(id);

            if (!existingNews) {
                res.status(404).json({ message: "Noticia no encontrada" });
                return;
            }

            if (existingNews.img && existingNews.img.public_id) {
                await deleteNewsImage(existingNews.img.public_id);
            }

            await deleteNews.execute(id);
            res.status(200).json({ message: "La noticia se eliminó correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}