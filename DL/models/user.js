// require("../db").connect();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", userSchema);
