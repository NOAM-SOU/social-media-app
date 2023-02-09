import { CommentI } from "../../interfaces/comment";
import commentModel from "../models/post";

export const create = async (comment: CommentI) => {
  return await commentModel.create(comment);
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
