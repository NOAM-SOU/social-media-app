import mongoose, { FilterQuery, Model, PopulateOption, Types } from "mongoose";

export async function readOneAndPopulate<T extends mongoose.Document>(
  model: Model<T>,
  id: string,
  field: string
) {
  return await model.findOne({ _id: id }).populate(field);
}

export async function readAndNestedPopulate<T>(
  model: Model<T>,
  id: string,
  path: string,
  path1: string
) {
  return await model.findOne({ _id: id }).populate({
    path: path,
    populate: {
      path: path1,
    },
  });
}

export async function findByInAndPopulte<T>(
  model: Model<T>,
  field: keyof T,
  values: Types.ObjectId[] | Types.ObjectId,
  path: string
) {
  const filter: FilterQuery<T> = [{ [field]: { $in: values } }];
  console.log("filter", filter);

  return await model.find(filter[0]).populate({
    path: path,
  });
}
