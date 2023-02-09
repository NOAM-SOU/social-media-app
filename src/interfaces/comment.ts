import { Types } from "mongoose";

export interface CommentI {
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
}
