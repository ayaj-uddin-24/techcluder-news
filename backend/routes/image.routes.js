import express from "express";
import {
  addImg,
  getImg,
  getImgByCategory,
  removeImg,
} from "../controllers/image.controller.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/get-img/:category", getImgByCategory);
router.get("/get-img", getImg);
router.post("/add-img", upload.single("image"), addImg);
router.delete("/remove-img/:id", removeImg);

export default router;
