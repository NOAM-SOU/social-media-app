import { Types } from "mongoose";
import { PostI } from "../../interfaces/post";
import postModel from "../models/post";

export const create = async (post: PostI) => {
  return await postModel.create(post);
};

export const read = async (): Promise<PostI[]> => {
  return await postModel.find();
};

export const readOne = async (postId: string) => {
  return await postModel.findOne({ _id: postId });
};

export const del = async (id: string) => {
  return await postModel.findOneAndRemove({ _id: id });
};

export const addUpdate = async (
  id: string,
  field: string,
  update: string,
  number: string
) => {
  return await postModel.findOneAndUpdate(
    { _id: id },
    { $inc: { [number]: 1 }, $push: { [field]: update } },
    { new: true }
  );
};

export const removeUpdate = async (
  postId: string,
  userId: string,
  field: string,
  number: string
) => {
  return await postModel.findByIdAndUpdate(
    postId,
    {
      $pull: {
        [field]: userId,
      },

      $inc: {
        [number]: -1,
      },
    },
    {
      new: true,
    }
  );
};

export const readAndNestedPopulate = async (
  postId: string,
  path: string,
  model: string,
  path2: string
  // by,
  // limit
) => {
  return await postModel.findOne({ _id: postId }).populate({
    path: path,
    populate: {
      path: path2,
      model: model,
    },
  });
};

export const readAndPopulate = async (postId: string, popu: string) => {
  return await postModel.findOne({ _id: postId }).populate(popu);
};

export const readAndSort = () => {
  return postModel.find().sort({ createdAt: -1 }).limit(2);
};
