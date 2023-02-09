import { create } from "../DL/controllers/commentController";
import { CommentI } from "../interfaces/comment";
import { Types } from "mongoose";
import {
  addUpdate,
  readAndNestedPopulate,
} from "../DL/controllers/postController";
import { filterFunc } from "./tools";

export const addNewComment = async (
  userId: string,
  postId: string,
  comment: CommentI
) => {
  const newComment = await create({
    ...comment,
    userId: userId,
    postId: postId,
  });
  const addCommentToPost = await addUpdate(
    postId.toString(),
    "comments",
    newComment._id.toString(),
    "numberOfComments"
  );
  return { newComment, addCommentToPost };
};

export const getComments = async (postId: string) => {
  const getAll = await readAndNestedPopulate(
    postId,
    "comments",
    "user",
    "userId"
  );
  return filterFunc(getAll.comments);
};
