import { Document, Types } from "mongoose";

export interface CommentI extends Document {
  content: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}
