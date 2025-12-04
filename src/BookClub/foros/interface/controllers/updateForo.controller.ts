import { UpdateForoService } from "../../app/service/updateForo.service";
import { UpdateForoMongo } from "../../infraestructure/foros.repo.mongo";
import { Request, Response } from "express";

const updateForoMongo = new UpdateForoMongo();
const updateForoService = new UpdateForoService(updateForoMongo);

export const updateForoController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const foro = req.body;
        const result = await updateForoService.updateForo(id, foro);

        if (!result) {
            res.status(404).json({ msg: 'Foro not found' });
            return;
        }

        res.status(200).json({
            msg: 'Foro updated successfully', result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error', error });
    }
};
