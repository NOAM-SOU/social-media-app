import { create } from "../../global/createDocument";
import { addUpdate } from "../../global/updateDocument";

import { PostI } from "../../interfaces/post";
import { Update } from "../../interfaces/update";
import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";

export const addNewPost = async (post: PostI, id: string) => {
  console.log("new", post, "id", id);

  const newPost = await create(postModel, post, undefined, id);
  const up: Update = {
    id: id,
    field: "posts",
    update: newPost._id,
    numberOf: "numberOfPosts",
    number: 1,
  };

  const addPostToUser = await addUpdate(userModel, up);
  return { newPost, addPostToUser };
};
