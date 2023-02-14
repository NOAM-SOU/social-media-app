import { create, del } from "../../DL/controllers/commentController";
import { CommentI } from "../../interfaces/comment";
import { Types } from "mongoose";
import {
  addUpdate,
  readAndNestedPopulate,
  removeUpdate,
} from "../../DL/controllers/postController";

export const addNewComment = async (
  userId: string,
  postId: string,
  comment: CommentI
) => {
  const newComment = await create(comment, userId, postId);
  const addCommentToPost = await addUpdate(
    postId,
    "comments",
    newComment._id.toString(),
    "numberOfComments"
  );
  return { newComment, addCommentToPost };
};

export const deleteComment = async (postId: string, id: string) => {
  const deleteCommentFromPost = await removeUpdate(
    postId,
    id,
    "comments",
    "numberOfComments"
  );
  await del(id);
  return deleteCommentFromPost;
};

export const getComments = async (postId: string) => {
  const getAll = await readAndNestedPopulate(
    postId,
    "comments",
    "user",
    "userId"
  );

  return getAll?.comments;

  // return filterFunc(getAll.comments);
};
