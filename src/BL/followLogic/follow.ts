import userModel from "../../DL/models/user";
import { findByInAndPopulte } from "../../global/readAndPopulateDocument";
import { read, readById, readOne } from "../../global/readDocument";

export const getFollowedPosts = async (userId: string) => {
  const get = await readById(userModel, userId);
  if (!get) {
    return [];
  }
  const followedUsers = await findByInAndPopulte(
    userModel,
    "_id",
    get.followed,
    "posts"
  );
  return followedUsers.flatMap((followedUser) => followedUser.posts);
};

export const getUser = async (email: string) => {
  return await readOne(userModel, "email", email);
};

export const getAllUsers = async () => {
  return await read(userModel);
};
