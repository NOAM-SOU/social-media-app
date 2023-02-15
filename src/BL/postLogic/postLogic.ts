import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";
import { readOneAndPopulate } from "../../global/readAndPopulateDocument";
import { readOne } from "../../global/readDocument";

export const getUserPosts = async (userId: string) => {
  const get = await readOneAndPopulate(userModel, userId, "posts");
  return get ? get.posts : [];
};

export const getPost = async (id: string) => {
  return await readOne(postModel, "_id", id);
};
