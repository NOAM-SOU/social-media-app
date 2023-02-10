import { Types } from "mongoose";

export interface CommentI {
  content: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}
