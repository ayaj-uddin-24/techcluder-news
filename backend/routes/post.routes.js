import express from "express";
import {
  addPost,
  editPost,
  getPost,
  removePost,
} from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/get-post", getPost);
router.post("/add-post", upload.single("image"), addPost);
router.delete("/remove-post/:id", removePost);
router.put("/edit-post/:id", upload.single("image"), editPost);

export default router;
