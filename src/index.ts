import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./DL/db";
import { auth } from "./Middleware/auth";
import userRouter from "./Routes/userRouter";
import postRouter from "./Routes/postRouter";
import commentRouter from "./Routes/commentRouter";
// import followRouter from "./Routes/followRouter";
import likesRouter from "./Routes/likeRouter";
import uploadRouter from "./Routes/uploadRouter";

import { uploadImg } from "./Middleware/uploadFile";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

connect();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api/user", userRouter);

app.use("/api/post", auth, postRouter);

app.use("/api/like", auth, likesRouter);
app.use("/api/comment", commentRouter);
app.use("/upload", uploadImg(), uploadRouter);

// app.use("/api/user/follow", auth, followRouter);

// app.use("/api/authuser", require("./Routes/userRouter"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
