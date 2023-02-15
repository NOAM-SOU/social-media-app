import { addUpdate, phAndPlUpdate } from "../../global/updateDocument";
import { Update, UpdatePhAndPl } from "../../interfaces/update";
import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";

export const removeSavedPost = async (userId: string, postId: string) => {
  const update: UpdatePhAndPl = {
    id: userId,
    field: "savedPosts",
    update: postId,
  };
  const userSaved = await phAndPlUpdate(userModel, update, false);
  const updateP: Update = {
    id: postId,
    field: "savedBy",
    update: userId,
    numberOf: "numberOfSave",
    number: -1,
  };
  const postSaved = await addUpdate(postModel, updateP);
  return { userSaved, postSaved };
};
