import { Types } from "mongoose";
import {
  addUpdate,
  create,
  removeUpdate,
  readOne as readPost,
  del,
} from "../DL/controllers/postController";
import {
  readAndPopulate,
  readbyId,
  readOne,
  update,
  updateUser,
} from "../DL/controllers/userController";
import { PostI } from "../interfaces/post";
import { PostError } from "./errors";

export const addNewPost = async (post: PostI, id: string) => {
  const newPost = await create(post, id);

  const addPostToUser = await update(
    id,
    "posts",
    newPost._id.toString(),
    "numberOfPosts"
  );
  return { newPost, addPostToUser };
};

export const deletePost = async (id: string, postId: string) => {
  const delPostFromUser = await updateUser(
    id,
    "posts",
    postId,
    "numberOfPosts"
  );
  await del(postId);
  return delPostFromUser;
};

export const savePost = async (id: string, postId: string) => {
  const userSaved = await readbyId(id);
  if (userSaved) {
    const array = userSaved.savedPosts.map((e: object) => e.toString());
    if (array.includes(postId)) throw new PostError("Post already saved", 1);
    await update(
      userSaved._id.toString(),
      "savedPosts",
      postId,
      "numberOfPosts"
    );
    const postSaved = await addUpdate(
      postId,
      "savedBy",
      userSaved._id.toString(),
      "numberOfSave"
    );
    return postSaved;
  }
};

export const removeSavedPost = async (userId: string, postId: string) => {
  const userSaved = await updateUser(
    userId,
    "savedPosts",
    postId,
    "numberOfPosts"
  );
  const postSaved = await removeUpdate(
    postId,
    userId,
    "savedBy",
    "numberOfSave"
  );
  return { userSaved, postSaved };
};

export const getUserPosts = async (userId: string) => {
  const get = await readAndPopulate(userId, "posts");
  return get ? get.posts : null;
};

export const getPost = async (id: string) => {
  return await readPost(id);
};
