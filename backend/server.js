import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/connectDB.js";
import postRouter from "./routes/post.routes.js";
import imageRouter from "./routes/image.routes.js";
import albumRouter from "./routes/album.routes.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// App config
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/post", postRouter);
app.use("/api/image", imageRouter);
app.use("/api/album", albumRouter);

// Get the home route
app.get("/", (req, res) => {
  res.send("I am home route");
});

// Run the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
