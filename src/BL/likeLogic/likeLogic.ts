import { addUpdate } from "../../global/updateDocument";
import { Update } from "../../interfaces/update";
import postModel from "../../DL/models/post";
import { readOneAndPopulate } from "../../global/readAndPopulateDocument";
import { readById } from "../../global/readDocument";
import { Types } from "mongoose";
import { PostError } from "../errors/errors";

export const addLikeToPost = async (userId: string, postId: string) => {
  const post = await readById(postModel, postId);
  if (post) {
    const array = post.likes.map((e: Types.ObjectId) => e.toString());
    if (array.includes(postId))
      throw new PostError(" already added like to post", 2);
  }
  const update: Update = {
    id: postId,
    field: "likes",
    update: userId,
    numberOf: "numberOfLikes",
    number: 1,
  };
  const addLikeToPost = await addUpdate(postModel, update);
  return addLikeToPost;
};

export const removeLike = async (userId: string, postId: string) => {
  const update: Update = {
    id: postId,
    field: "likes",
    update: userId,
    numberOf: "numberOfLikes",
    number: -1,
  };
  const removeLikeFromPost = await addUpdate(postModel, update, false);
  return removeLikeFromPost;
};

export const getLikes = async (postId: string) => {
  const likes = await readOneAndPopulate(postModel, postId, "likes");
  return likes;
};
