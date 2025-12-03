import { GetMetadataAuthor } from "../../domain/ports/getAuthorForMetadata";
import { Types } from "mongoose";

export class GetMetadataAuthorService {
    constructor(private readonly getMetadataAuthor: GetMetadataAuthor) { }
    async getMetadata(): Promise<{ _id: Types.ObjectId; fullName: string }[]> {
        return await this.getMetadataAuthor.getMetadata();
    }
}
