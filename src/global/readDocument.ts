import { FilterQuery, Model } from "mongoose";

export async function read<T>(model: Model<T>): Promise<T[]> {
  return await model.find();
}

export async function readOne<T>(
  model: Model<T>,
  field: keyof T,
  by: T[keyof T]
): Promise<T | null> {
  const filter: FilterQuery<T> = [{ [field]: by }];
  return await model.findOne(filter);
}

export async function readById<T>(
  model: Model<T>,
  id: string
): Promise<T | null> {
  return await model.findById({ _id: id });
}
