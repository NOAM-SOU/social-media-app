import { findByInAndPopulte } from "../../global/readAndPopulateDocument";
import postModel from "../../DL/models/post";
import commentModel from "../../DL/models/comment";

import { readById } from "../../global/readDocument";

export const getComments = async (postId: string) => {
  const post = await readById(postModel, postId);
  if (!post) {
    return [];
  }
  const getAll = await findByInAndPopulte(
    commentModel,
    "postId",
    post._id,
    "userId"
  );
  return getAll;
};
