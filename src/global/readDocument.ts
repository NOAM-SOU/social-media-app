import { FilterQuery, Model, Types } from "mongoose";

export async function read<T>(model: Model<T>): Promise<T[]> {
  return await model.find().lean();
}

export async function readOne<T>(
  model: Model<T>,
  field: keyof T,
  by: T[keyof T]
): Promise<T | null> {
  const filter: FilterQuery<T> = [{ [field]: by }];
  return await model.findOne(filter[0]).lean();
}

export async function readById<T>(
  model: Model<T>,
  id: string
): Promise<T | null> {
  return await model.findById({ _id: id }).lean();
}

export async function findByIn<T>(
  model: Model<T>,
  field: keyof T,
  values: Types.ObjectId[] | Types.ObjectId
) {
  const filter: FilterQuery<T> = [{ [field]: { $in: values } }];
  console.log("filter", filter);

  return await model.find(filter[0]).lean();
}
