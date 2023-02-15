import { create } from "../../global/createDocument";
import { addUpdate } from "../../global/updateDocument";
import commentModel from "../../DL/models/comment";
import postModel from "../../DL/models/post";

import { CommentI } from "../../interfaces/comment";
import { Update } from "../../interfaces/update";

export const addNewComment = async (
  userId: string,
  postId: string,
  comment: CommentI
) => {
  const newComment = await create(commentModel, comment, userId, postId);
  const update: Update = {
    id: postId,
    field: "comments",
    update: newComment._id,
    numberOf: "numberOfComments",
    number: 1,
  };
  const addCommentToPost = await addUpdate(postModel, update);
  return { newComment, addCommentToPost };
};
