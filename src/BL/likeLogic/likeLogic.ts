import { addUpdate } from "../../global/updateDocument";
import { Update } from "../../interfaces/update";
import postModel from "../../DL/models/post";
import { readById } from "../../global/readDocument";
import { Types } from "mongoose";
import userModel from "../../DL/models/user";
import { findByIn } from "../../global/readDocument";
import { PostError } from "../errors/errors";

export const addLikeToPost = async (userId: string, postId: string) => {
  // console.log("userrrrr", userId);

  const post = await readById(postModel, postId);
  if (post) {
    const array = post.likes.map((e: Types.ObjectId) => e.toString());
    if (array.includes(userId))
      throw new PostError(" already added like to post", 2);
  }
  // const newLike = await create(likeModel, undefined, undefined, userId, postId);

  const update: Update = {
    id: postId,
    field: "likes",
    update: userId,
    numberOf: "numberOfLikes",
    number: 1,
  };
  const addLikeToPost = await addUpdate(postModel, update);
  console.log(addLikeToPost, "ADD LIKE TO POST");

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
  // const removeLike  = await deleteDoc(likeModel,)
  console.log(removeLikeFromPost, "REMOVE LIKE FROM POST");

  return removeLikeFromPost;
};

export const getLikes = async (postId: string) => {
  const post = await readById(postModel, postId);
  const likes = await findByIn(userModel, "_id", post.likes);
  console.log("likesssss", likes);
  return likes;
};

export const checkIfLike = async (
  userId: string,
  postId: string
): Promise<boolean> => {
  const post = await readById(postModel, postId);
  const array = post.likes.map((e: Types.ObjectId) => e.toString());
  const inc = array.includes(userId);
  console.log(inc, "INCLUEDS");
  return inc;
};
