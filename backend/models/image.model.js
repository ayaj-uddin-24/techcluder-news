import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
