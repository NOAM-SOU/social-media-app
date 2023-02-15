import { readById } from "../../global/readDocument";
import { addUpdate, phAndPlUpdate } from "../../global/updateDocument";
import { Update, UpdatePhAndPl } from "../../interfaces/update";
import { PostError } from "../errors/errors";
import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";

export const savePost = async (id: string, postId: string) => {
  const userSaved = await readById(userModel, id);
  if (userSaved) {
    const array = userSaved.savedPosts.map((e: object) => e.toString());
    if (array.includes(postId)) throw new PostError("Post already saved", 1);
    const update: UpdatePhAndPl = {
      id,
      field: "savedPosts",
      update: postId,
    };
    await phAndPlUpdate(userModel, update);
    const updateP: Update = {
      id: postId,
      field: "savedBy",
      update: userSaved._id,
      numberOf: "numberOfSave",
      number: 1,
    };
    const postSaved = await addUpdate(postModel, updateP);
    return postSaved;
  }
};
