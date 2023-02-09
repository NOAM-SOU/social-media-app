import mongoose, { HydratedDocument } from "mongoose";
import { UserI } from "../../interfaces/user";

export type UserDocument = HydratedDocument<UserI>;

const userSchema = new mongoose.Schema<UserI>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  numberOfPosts: {
    type: Number,
    default: 0,
  },
  numberOfFollowers: {
    type: Number,
    default: 0,
  },
  numberOfFollowed: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("user", userSchema);
