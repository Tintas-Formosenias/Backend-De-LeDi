import { Types } from "mongoose";

export class BookUserProgresRepo {
    constructor(
        public readonly idUser: Types.ObjectId,
        public readonly idBook: Types.ObjectId,
        public unit: "page" | "second" | "seconds" | "pages",
        public position: number,
        public percent: number,
        public total: number,
        public status: "reading" | "finished" | "pending" | "abandoned",
        public readonly startDate: Date,
        public finishDate: Date,
        public readonly UpdateLast: Date

    ) { }
}