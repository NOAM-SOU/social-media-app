import { Document, Model } from "mongoose";

export async function create<T extends Document>(
  model: Model<T>,
  newDoc: T,
  id?: string,

  userId?: string,
  postId?: string
): Promise<T> {
  return await model.create({ ...newDoc, _id: id, userId, postId });
}
