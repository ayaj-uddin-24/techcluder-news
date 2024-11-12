import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
