import {
  read,
  readAndNestedPopulate,
  readOne,
  update,
} from "../DL/controllers/userController";

export const addFollow = async (userId: string, to: string) => {
  const newFollow = await update(to, "followers", userId, "numberOfFollowers");
  const newFollowed = await update(userId, "followed", to, "numberOfFollowed");
  return { newFollow, newFollowed };
};

export const getPosts = async (userId: string) => {
  const get = await readAndNestedPopulate(userId, "followed", "post", "posts");
  const arrays = await get.followed.map((p) => {
    return p;
  });
  return arrays.flat();
};

export const getUser = async (email: string) => {
  const res = await readOne(email);
  console.log(res);
  return res;
};

export const getAllUsers = async () => {
  const allUsers = await read();
  return allUsers;
};
