import mongoose from "mongoose";

const albumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
