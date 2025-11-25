import { BooksQueryRepository } from "../../domain/booksQueryRepository";
import { BookModel } from "../model/books.model";
import { BookDetail } from "../../../shared/types/bookTypes/bookTypes";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import mongoose, { Types } from "mongoose";
import { PipelineStage } from "mongoose";

export class MongoQueryRepository implements BooksQueryRepository {

	//  ✅
	async getIntelligenceBook(query: string[], userLevel?: string): Promise<BookSearch[]> {
		const searchText = query.join(" ");
		const matchText: any = { $text: { $search: searchText } };

		if (userLevel) {
			matchText.level = userLevel;
		}

		let orderedBooks = await BookModel.aggregate([
			{ $match: matchText },
			{
				$lookup: {
					from: "authormodels",
					localField: "author",
					foreignField: "_id",
					as: "authorData"
				}
			},
			{ $addFields: { matchScore: { $meta: "textScore" } } },
			{ $sort: { matchScore: -1, createdAt: -1 } },
			{
				$project: {
					_id: 1,
					title: 1,
					summary: 1,
					synopsis: 1,
					subgenre: 1,
					theme: 1,
					genre: 1,
					yearBook: 1,
					language: 1,
					available: 1,
					level: 1,
					format: 1,
					fileExtension: 1,
					totalPages: 1,
					createdAt: 1,
					updatedAt: 1,
					contentBook: 1,
					bookCoverImage: 1,
					matchScore: 1,
					author: {
						$map: {
							input: "$authorData",
							as: "a",
							in: {
								_id: "$$a._id",
								fullName: "$$a.fullName"
							}
						}
					}
				}
			}
		]);

		if (orderedBooks.length === 0) {
			const regex = new RegExp(searchText.split(" ").join("|"), "i");
			const regexMatch: any = {};

			if (userLevel) {
				regexMatch.level = userLevel;
			}

			orderedBooks = await BookModel.aggregate([
				{
					$lookup: {
						from: "authormodels",
						localField: "author",
						foreignField: "_id",
						as: "authorData"
					}
				},
				{
					$match: {
						...regexMatch,
						$or: [
							{ title: regex },
							{ summary: regex },
							{ synopsis: regex },
							{ genre: regex },
							{ theme: regex },
							{ subgenre: regex },
							{ "authorData.fullName": regex }
						]
					}
				},
				{
					$addFields: { matchScore: 0.1 }
				},
				{
					$project: {
						_id: 1,
						title: 1,
						summary: 1,
						synopsis: 1,
						subgenre: 1,
						theme: 1,
						genre: 1,
						yearBook: 1,
						language: 1,
						available: 1,
						level: 1,
						format: 1,
						fileExtension: 1,
						totalPages: 1,
						createdAt: 1,
						updatedAt: 1,
						contentBook: 1,
						bookCoverImage: 1,
						author: {
							$map: {
								input: "$authorData",
								as: "a",
								in: {
									_id: "$$a._id",
									fullName: "$$a.fullName"
								}
							}
						},
						matchScore: 1
					}
				},
				{ $sort: { createdAt: -1 } }
			]);
		}

		return orderedBooks;
	}

	//  ✅
	async getContentBookById(id: Types.ObjectId): Promise<string | null> {
		const book: BookDetail | null = await BookModel.findById(id);

		if (!book) return null;

		return book.contentBook.url_secura;
	}

	//  ✅
	async getAllBooksByLevel(nivel: string): Promise<BookSearch[]> {
		const levelHierarchy: Record<string, string[]> = {
			"Inicial": ["Inicial"],
			"Secundario": ["Secundario", "Inicial"],
			"Joven Adulto": ["Joven Adulto", "Secundario", "Inicial"],
			"Adulto Mayor": ["Adulto Mayor", "Joven Adulto", "Secundario", "Inicial"]
		};

		const allowedLevels = levelHierarchy[nivel] || ["Inicial", "Secundario", "Joven Adulto", "Adulto Mayor"];

		const books = await BookModel.find({ level: { $in: allowedLevels } })
			.populate("author", "fullName")
			.sort({ createdAt: -1 });

		return books;
	}

	//  ✅
	async getBooksByFiltering(
		theme: string[] = [],
		subgenre: string[] = [],
		yearBook: string[] = [],
		genre: string[] = [],
		format: string[] = [],
		level?: string
	): Promise<BookSearch[]> {
		const levelHierarchy: Record<string, string[]> = {
			inicial: ["Inicial"],
			secundario: ["Secundario", "Inicial"],
			"joven adulto": ["Joven Adulto", "Secundario", "Inicial"],
			"adulto mayor": ["Adulto Mayor", "Joven Adulto", "Secundario", "Inicial"],
		};

		const scoreConditions: any[] = [];

		if (yearBook?.length) {
			scoreConditions.push({ $cond: [{ $in: ["$yearBook", yearBook] }, 1, 0] });
		}
		if (theme?.length) {
			scoreConditions.push({
				$cond: [
					{ $gt: [{ $size: { $setIntersection: ["$theme", theme] } }, 0] },
					1,
					0,
				],
			});
		}
		if (subgenre?.length) {
			scoreConditions.push({
				$cond: [
					{ $gt: [{ $size: { $setIntersection: ["$subgenre", subgenre] } }, 0] },
					1,
					0,
				],
			});
		}
		if (genre?.length) {
			scoreConditions.push({ $cond: [{ $in: ["$genre", genre] }, 1, 0] });
		}
		if (format?.length) {
			scoreConditions.push({ $cond: [{ $in: ["$format", format] }, 1, 0] });
		}
		if (level && levelHierarchy[level]?.length) {
			scoreConditions.push({
				$cond: [{ $in: ["$level", levelHierarchy[level]] }, 1, 0],
			});
		}

		const pipeline: any[] = [
			{
				$addFields: {
					score: { $add: scoreConditions.length > 0 ? scoreConditions : [0] },
				},
			},
			// 🔎 Filtrar solo los que tienen score > 0
			{ $match: { score: { $gt: 0 } } },
			{ $sort: { score: -1 } },
			{
				$lookup: {
					from: "authormodels",
					localField: "author",
					foreignField: "_id",
					as: "authorData",
				},
			},
			{
				$addFields: {
					author: {
						$map: {
							input: "$authorData",
							as: "a",
							in: { _id: "$$a._id", fullName: "$$a.fullName" },
						},
					},
				},
			},
			{
				$project: {
					__v: 0,
					biography: 0,
					profession: 0,
					birthdate: 0,
					birthplace: 0,
					nationality: 0,
					writingGenre: 0,
					books: 0,
					authorData: 0,
				},
			},
		];

		const books = await BookModel.aggregate(pipeline).exec();
		return books as BookSearch[];
	}

	//  ✅
	async getBooksByIds(ids: Types.ObjectId[]): Promise<BookSearch[]> {
		const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
		const books = await BookModel.find({ _id: { $in: objectIds } }).populate("author", "fullName");
		return books;
	}

}