import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routes
import userRoute from "../backend/routes/users.js";
import authRoute from "../backend/routes/auth.js";
import postRoute from "../backend/routes/posts.js";

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("CONNECTED TO MONGO DB SERVER");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//M/ MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("req.body", req.body);
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

//M/ ROUTES
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {
  console.log("SERVER IS RUNNING AT PORT 5000...");
});
