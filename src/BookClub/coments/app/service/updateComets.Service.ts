import { ComentTypes } from "../../domain/entities/coments.types";
import { IUpdateComentPort } from "../../domain/ports/updateComents.ports";


export class UpdateCometService implements IUpdateComentPort {
    constructor(
        private readonly updateComentsRepo: IUpdateComentPort
    ) { }
    async updateComents(userID: any, idComent: any, coment: Partial<ComentTypes>): Promise<ComentTypes | null> {
        return await this.updateComentsRepo.updateComents(userID, idComent, coment)

    }

}