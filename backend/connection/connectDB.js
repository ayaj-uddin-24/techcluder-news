import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      connectTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 30000,
    });
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
