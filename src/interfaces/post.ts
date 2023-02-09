import { Types } from "mongoose";

export interface PostI {
  title: string;
  content: string;
  img: string;
  userId: string;
  comments: Types.ObjectId;
  likes: Types.ObjectId;
  savedBy: Types.ObjectId[];
  numberOfSave: number;
  numberOfLikes: number;
  numberOfComments: number;
  createdAt: Date;
}
