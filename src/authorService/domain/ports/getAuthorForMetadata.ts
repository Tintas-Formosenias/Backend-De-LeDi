import { Types } from "mongoose";
export interface GetMetadataAuthor {
    getMetadata(): Promise<({
        _id: Types.ObjectId;
        fullName: string;
    })[]>;
}