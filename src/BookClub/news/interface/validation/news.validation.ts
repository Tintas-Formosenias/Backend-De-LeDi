import { z } from "zod";

export const newsSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});

export const validateNews = (data: any) => {
    return newsSchema.safeParse(data);
};
