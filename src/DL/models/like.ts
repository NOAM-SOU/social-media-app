import mongoose from "mongoose";
import { LikeI } from "../../interfaces/like";
const likeSchema = new mongoose.Schema<LikeI>({
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

export default mongoose.model<LikeI>("like", likeSchema);
