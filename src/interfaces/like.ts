import { Document, Types } from "mongoose";

export interface LikeI extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}
