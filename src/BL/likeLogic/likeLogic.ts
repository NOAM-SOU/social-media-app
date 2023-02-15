import { addUpdate } from "../../global/updateDocument";
import { Update } from "../../interfaces/update";
import postModel from "../../DL/models/post";
import { readOneAndPopulate } from "../../global/readAndPopulateDocument";

export const addLikeToPost = async (userId: string, postId: string) => {
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
