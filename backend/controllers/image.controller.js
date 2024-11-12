import Image from "../models/image.model.js";
import cloudinary from "../utils/cloudinary.js";

export const addImg = async (req, res) => {
  try {
    const { category } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const newImg = await Image({
      category,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });
    await newImg.save();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeImg = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    cloudinary.uploader.destroy(image.imagePublicId);

    res.status(200).json({ success: true, message: "Image removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getImg = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category });

    if (!images) {
      return res
        .status(404)
        .json({ success: false, message: "Images not found!" });
    }

    res.status(200).json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
