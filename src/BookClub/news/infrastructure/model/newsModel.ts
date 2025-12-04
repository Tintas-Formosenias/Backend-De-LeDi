import mongoose from "mongoose";
import { News } from "../../domain/entities/news.entity";

const newsSchema = new mongoose.Schema<News>({
    title: String,
    description: String,
    date: Date,
    img: {
        url: String,
        public_id: String
    }
});

const NewsModel = mongoose.model<News>("News", newsSchema);

export default NewsModel;
