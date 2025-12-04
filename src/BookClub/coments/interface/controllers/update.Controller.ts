import { UpdateCometService } from "../../app/service/updateComets.Service";
import { ComentTypes } from "../../domain/entities/coments.types";
import { UpdateComents } from "../../infraestructure/comentsMongoRepo";


const UpdateComentsMongo = new UpdateComents();
const updateComentControllers = new UpdateCometService(UpdateComentsMongo)


export const UpateController = async (idComent: any, userId: any, coment: ComentTypes) => {
    return await updateComentControllers.updateComents(userId, idComent, coment)

}