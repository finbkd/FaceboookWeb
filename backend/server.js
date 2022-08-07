import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import { Server } from "socket.io";
import { createServer } from "http";

// import Peer from "peerjs";

//a/ routes
import userRoute from "../backend/routes/users.js";
import authRoute from "../backend/routes/auth.js";
import postRoute from "../backend/routes/posts.js";
import commentRoute from "../backend/routes/comment.js";
import chatRoute from "../backend/routes/chat.js";
import notificationRoute from "./routes/notification.js";

import friendRequestRoute from "../backend/routes/friendRequest.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { protect } from "./middleware/authMiddleware.js";

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

const app = express();
connectDB();

// const peer = new Peer();
// console.log(peer);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    // allowedHeaders: "origin, content-type, accept",
  },
});

//a/ MIDDLEWARE
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));

//a/ ROUTES
app.use("/api/users", protect, userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", protect, postRoute);
app.use("/api/frndReq", protect, friendRequestRoute);
app.use("/api/comments", protect, commentRoute);
app.use("/api/chat", protect, chatRoute);
app.use("/api/notification", protect, notificationRoute);
// ERROR ROUTES
app.use(notFound);
app.use(errorHandler);

io.on("connection", async (socket) => {
  socket.on("user online", (id) => {
    console.log(id);
  });

  socket.on("join room", (id) => {
    socket.join("room69");
    socket.to("room69").emit("user-joined", id);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on("call the other user", (id) => {
    socket.to("room69").emit("call the other user", id);
  });

  socket.on("status_online", () => {
    socket.broadcast.emit("status_changed");
  });

  console.log(io.sockets.adapter.rooms);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.emit("status_offline");
    console.log("user went offline");
    console.log(io.sockets.adapter.rooms);
  });
});

httpServer.listen(5000, () => {
  console.log("SERVER IS RUNNING AT PORT 5000...");
});
