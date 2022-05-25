// require("../db").connect();
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  savedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  numberOfSave: {
    type: Number,
    default: 0,
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  numberOfComments: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
