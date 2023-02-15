import { addUpdate } from "../../global/updateDocument";
import { Update } from "../../interfaces/update";
import postModel from "../../DL/models/post";
import commentModel from "../../DL/models/comment";

import { deleteDoc } from "../../global/deleteDocument";

export const deleteComment = async (postId: string, id: string) => {
  const update: Update = {
    id: postId,
    field: "comments",
    update: id,
    numberOf: "numberOfComments",
    number: -1,
  };
  const deleteCommentFromPost = await addUpdate(postModel, update, false);
  await deleteDoc(commentModel, id);
  return deleteCommentFromPost;
};
