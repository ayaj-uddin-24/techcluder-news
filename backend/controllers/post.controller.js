import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";

export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findOne({ title });
    if (post) {
      return res
        .status(400)
        .json({ success: false, message: "Post already exists!" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newPost = new Post({
      image: result.secure_url,
      imagePublicId: result.public_id,
      title,
      content,
    });

    await newPost.save();

    res.status(201).json({ success: true, message: "Post added", newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.imagePublicId) {
      await cloudinary.uploader.destroy(post.imagePublicId);
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Post removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({});

    if (!posts.length) {
      return res
        .status(404)
        .json({ success: false, message: "No posts found!" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (req.file) {
      if (post.imagePublicId) {
        await cloudinary.uploader.destroy(post.imagePublicId);
      }

      post.image = req.file.path;
      post.imagePublicId = req.file.filename;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
