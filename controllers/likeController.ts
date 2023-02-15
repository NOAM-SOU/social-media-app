import { LikeI } from "../interfaces/like";
import likeModel from "../DL/models/post";

export const create = async (comment: LikeI) => {
  return await likeModel.create(comment);
};

export const read = async (): Promise<LikeI[]> => {
  return await likeModel.find();
};

export const del = async (id: string) => {
  return await likeModel.findOneAndRemove({ _id: id });
};
