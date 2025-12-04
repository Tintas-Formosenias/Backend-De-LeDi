import { Foro } from "../domain/entities/foros.types";
import { ICreateForo } from "../domain/ports/createForoPort";
import { IDeleteForo } from "../domain/ports/deleteForoPort";
import { IFindForos } from "../domain/ports/findForoPort";
import { IUpdateForo } from "../domain/ports/updateForoPort";
import { ForosModel } from "./models/forosModel";


export class FindForoMongo implements IFindForos {
    async findForoById(id: any): Promise<Foro | null> {
        const result = await ForosModel.findById(id)

        return result
    }
    async findForos(): Promise<Foro[]> {
        const result = await ForosModel.find()
        return result
    }
}

export class CreateForoMongo implements
    ICreateForo {
    async createForo(foro: Foro): Promise<Foro> {
        const newForo = new ForosModel(foro);
        return await newForo.save()
    }
}
export class DeleteForoMongo implements IDeleteForo {
    async deleteForo(id: any): Promise<void> {
        await ForosModel.findByIdAndDelete(id)
    }
}

export class UpdateForoMongo implements IUpdateForo {
    async updateForo(id: string, foro: Partial<Foro>): Promise<Foro | null> {
        return await ForosModel.findByIdAndUpdate(id, foro, { new: true });
    }
}