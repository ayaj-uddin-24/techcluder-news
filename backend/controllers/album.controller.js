import Album from "../models/album.model.js";

export const addAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const album = await Album.findOne({ name });

    if (album) {
      return res
        .status(400)
        .json({ success: false, message: "Album already exists" });
    }

    const newAlbum = new Album({ name });
    await newAlbum.save();

    res.status(201).json({ success: true, message: "Album created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Album removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAlbum = async (req, res) => {
  try {
    const albums = await Album.find({});

    if (!albums) {
      return res
        .status(404)
        .json({ success: false, message: "No albums found!" });
    } else {
      return res.status(200).json({ success: true, albums });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
