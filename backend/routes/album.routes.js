import express from "express";
import {
  addAlbum,
  getAlbum,
  removeAlbum,
} from "../controllers/album.controller.js";
const router = express.Router();

router.get("/get-album", getAlbum);
router.post("/add-album", addAlbum);
router.delete("/remove-album/:id", removeAlbum);

export default router;
