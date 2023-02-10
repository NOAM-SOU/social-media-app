import {
  readOne,
  update,
  findByInAndPopulte,
  readbyId,
  read,
  updateUser,
} from "../DL/controllers/userController";
import { UserDocument } from "../DL/models/user";

export const addFollow = async (userId: string, to: string) => {
  const newFollow = await update(to, "followers", userId, "numberOfFollowers");
  const newFollowed = await update(userId, "followed", to, "numberOfFollowed");
  return { newFollow, newFollowed };
};

export const removeFollow = async (userId: string, from: string) => {
  const removeFromUser = await updateUser(
    userId,
    "followed",
    from,
    "numberOfFollowed"
  );
  const removeFromFollowedUser = await updateUser(
    from,
    "followers",
    userId,
    "numberOfFollowers"
  );
  return { removeFromUser, removeFromFollowedUser };
};

export const getFollowedPosts = async (userId: string) => {
  const get: UserDocument | null = await readbyId(userId);
  if (!get) {
    return [];
  }
  const followedUsers = await findByInAndPopulte("_id", get.followed, "posts");
  return followedUsers.flatMap((followedUser) => followedUser.posts);
};

export const getUser = async (email: string) => {
  const res = await readOne(email);
  console.log(res);
  return res;
};

export const getAllUsers = async () => {
  return await read();
};
