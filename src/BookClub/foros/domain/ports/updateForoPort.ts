import { Foro } from "../entities/foros.types";

export interface IUpdateForo {
    updateForo(id: string, foro: Partial<Foro>): Promise<Foro | null>;
}
