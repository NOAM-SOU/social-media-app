import { create, del } from "../../DL/controllers/commentController";
import { CommentI } from "../../interfaces/comment";
import { Types } from "mongoose";
import {
  findByInAndPopulte,
  readAndNestedPopulate,
} from "../../global/readAndPopulateDocument";
import postModel from "../../DL/models/post";
import { readById, readOne } from "../../global/readDocument";

export const getComments = async (postId: string) => {
  const post = await readById(postModel, postId);
  if (!post) {
    return [];
  }
  const getAll = await findByInAndPopulte(
    postModel,
    "_id",
    post.comments,
    "userId"
  );

  return getAll;

  // return filterFunc(getAll.comments);
};

// postId,
// "comments",
// "user",
// "userId"
