import { Request, Response } from "express";
import { GetMetadataAuthorService } from "../../app/service/GetMetadas.service";
import { GetMetadataAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";

const getMetadataAuthorService = new GetMetadataAuthorService(new GetMetadataAuthorMongoRepo());
export const getMetadata = async (_req: Request, res: Response) => {
    try {
        const result = await getMetadataAuthorService.getMetadata();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "internal server error" });
    }
};
