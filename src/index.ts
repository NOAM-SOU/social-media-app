import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connect } from "./DL/db";
import { auth } from "./Middleware/auth";
import userRouter from "./Routes/userRouter";
import postRouter from "./Routes/postRouter";
import commentRouter from "./Routes/commentRouter";
import followRouter from "./Routes/followRouter";
import likesRouter from "./Routes/likeRouter";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

connect();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api/user", userRouter);

app.use("/api/user/post", auth, postRouter);

app.use("/api/user/like", auth, likesRouter);
app.use("/api/user/comment", auth, commentRouter);
app.use("/api/user/follow", auth, followRouter);

// app.use("/api/authuser", require("./Routes/userRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
