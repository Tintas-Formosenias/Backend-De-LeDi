import { Foro } from "../../domain/entities/foros.types";
import { IUpdateForo } from "../../domain/ports/updateForoPort";

export class UpdateForoService implements IUpdateForo {
    constructor(
        private readonly updateRepo: IUpdateForo
    ) { }

    async updateForo(id: string, foro: Partial<Foro>): Promise<Foro | null> {
        return await this.updateRepo.updateForo(id, foro);
    }
}
