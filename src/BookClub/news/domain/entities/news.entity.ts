export class News {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly date: Date,
        public readonly img?: {
            url: string,
            public_id: string
        },
        public readonly _id?: string
    ) { }
}
