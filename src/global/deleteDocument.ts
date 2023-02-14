import { Document, Model } from "mongoose";
import User from "../DL/models/user";

export async function deleteDoc<T extends Document>(
  model: Model<T>,
  id: string
): Promise<T | null> {
  if (model instanceof User) {
    return await model.findOneAndUpdate(
      {
        _id: id,
      },
      { isActive: false },
      { new: true }
    );
  }
  return await model.findOneAndRemove({ _id: id });
}
