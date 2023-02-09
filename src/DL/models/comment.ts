import mongoose from "mongoose";
import { CommentI } from "../../interfaces/comment";
const commentSchema = new mongoose.Schema<CommentI>({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);
