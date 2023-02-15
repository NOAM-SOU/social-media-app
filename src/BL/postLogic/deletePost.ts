import { deleteDoc } from "../../global/deleteDocument";
import { addUpdate } from "../../global/updateDocument";
import { Update } from "../../interfaces/update";
import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";

export const deletePost = async (id: string, postId: string) => {
  const up: Update = {
    id: id,
    field: "posts",
    update: postId,
    numberOf: "numberOfPosts",
    number: -1,
  };
  const delPostFromUser = await addUpdate(userModel, up, false);
  await deleteDoc(postModel, postId);
  return delPostFromUser;
};
