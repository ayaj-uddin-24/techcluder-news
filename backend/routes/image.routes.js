import express from "express";
import { addImg, getImg, removeImg } from "../controllers/image.controller.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/get-img/:category", getImg);
router.post("/add-img", upload.single("image"), addImg);
router.delete("/remove-img/:id", removeImg);

export default router;
