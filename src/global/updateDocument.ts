import { Document, Model, UpdateQuery } from "mongoose";
import { Update, UpdatePhAndPl } from "../interfaces/update";

export async function addUpdate<T extends Document>(
  model: Model<T>,
  objToUp: Update,
  or: boolean = true
): Promise<T | null> {
  const update: UpdateQuery<T> = {
    $push: { [objToUp.field]: objToUp.update } as any,
    $inc: { [objToUp.numberOf]: objToUp.number } as any,
  };
  const reUpdate: UpdateQuery<T> = {
    $pull: { [objToUp.field]: objToUp.update } as any,
    $inc: { [objToUp.numberOf]: objToUp.number } as any,
  };
  if (or)
    return await model.findOneAndUpdate({ _id: objToUp.id }, update, {
      new: true,
    });
  return await model.findOneAndUpdate({ _id: objToUp.id }, reUpdate, {
    new: true,
  });
}

export async function phAndPlUpdate<T extends Document>(
  model: Model<T>,
  objToUp: UpdatePhAndPl,
  or: boolean = true
): Promise<T | null> {
  const update: UpdateQuery<T> = {
    $push: { [objToUp.field]: objToUp.update } as any,
  };
  const reUpdate: UpdateQuery<T> = {
    $pull: { [objToUp.field]: objToUp.update } as any,
  };
  if (or)
    return await model.findOneAndUpdate({ _id: objToUp.id }, update, {
      new: true,
    });
  return await model.findOneAndUpdate({ _id: objToUp.id }, reUpdate, {
    new: true,
  });
}
