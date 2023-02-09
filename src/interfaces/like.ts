import { Types } from "mongoose";

export interface LikeI {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}
