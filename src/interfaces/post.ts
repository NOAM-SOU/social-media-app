import { Types } from "mongoose";

export interface PostI {
  title: string;
  content: string;
  img: string;
  userId: Types.ObjectId;
  comments: Types.ObjectId;
  likes: Types.ObjectId;
  savedBy: Types.ObjectId[];
  numberOfSave: number;
  numberOfLikes: number;
  numberOfComments: number;
  createdAt: Date;
}
