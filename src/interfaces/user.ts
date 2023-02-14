import { Document, Types } from "mongoose";

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
  biography: string;
  profileImg: string;
  followers: Types.ObjectId[];
  followed: Types.ObjectId[];
  posts: Types.ObjectId[];
  savedPosts: Types.ObjectId[];
  comments: Types.ObjectId[];
  numberOfPosts: number;
  numberOfFollowers: number;
  numberOfFollowed: number;
  isActive: boolean;
}

export interface UserDetails {
  id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
}

export interface ExistingUser {
  email: string;
  password: string;
}
