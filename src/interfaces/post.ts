import { Document, Types } from "mongoose";

export interface PostI extends Document {
  title: string;
  content: string;
  img: string;
  userId: Types.ObjectId;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  savedBy: Types.ObjectId[];
  numberOfSave: number;
  numberOfLikes: number;
  numberOfComments: number;
  createdAt: Date;
}
