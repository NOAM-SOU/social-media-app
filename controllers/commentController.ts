import { CommentI } from "../interfaces/comment";
import commentModel from "../DL/models/comment";

export const create = async (
  comment: CommentI,
  userId: string,
  postId: string
) => {
  return await commentModel.create({ ...comment, userId, postId });
};

export const read = async (): Promise<CommentI[]> => {
  return await commentModel.find();
};

export const readOne = async (id: string) => {
  return await commentModel.findOne({ _id: id });
};

export const update = async (id: string, newPost: CommentI) => {
  return await commentModel.findOneAndUpdate({ _id: id }, newPost, {
    new: true,
  });
};

export const del = async (id: string) => {
  return await commentModel.findOneAndRemove({ _id: id });
};
