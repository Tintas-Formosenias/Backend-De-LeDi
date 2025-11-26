import { Router } from "express";
import multer from "multer";
import { deleteMedals, findByIdMedal, saveMedal } from "../controllers/medal.controllers";
import { awardBestReaderController } from "../controllers/awardMedalController";



export const medalRoutes = Router()

const upload = multer({ dest: "uploads/" });


medalRoutes.post("/saveMedal", upload.single("img"), saveMedal)
medalRoutes.delete("/deletelmedals/:id", deleteMedals)
medalRoutes.get("/medal/:id", findByIdMedal)
medalRoutes.post("/award-best-reader", awardBestReaderController)