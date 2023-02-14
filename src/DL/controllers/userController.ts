import { Types } from "mongoose";
import { UserI } from "../../interfaces/user";
import userModel, { UserDocument } from "../models/user";

// export const create = async (user: UserI) => {
//   return await userModel.create(user);
// };

// export const read = async (): Promise<UserI[]> => {
//   return await userModel.find();
// };

export const readOne = async (email: string) => {
  return await userModel.findOne({ email });
};

export async function readbyId(id: string) {
  return await userModel.findById({ _id: id });
}

// export async function del(id: string) {
//   return await userModel.findByIdAndUpdate(
//     id,
//     { isActive: false },
//     { new: true }
//   );
// }

export const readOneAndPopulate = async (id: string, field: string) => {
  return await userModel.findOne({ _id: id }).populate(field);
};

export async function update(
  id: string,
  field: string,
  update: string,
  number: string
) {
  return await userModel.findOneAndUpdate(
    { _id: id },
    { $push: { [field]: update }, $inc: { [number]: 1 } },
    { new: true }
  );
}

export async function updateUser(
  userId: string,
  field: string,
  id: string,
  number: string
) {
  return await userModel.findByIdAndUpdate(
    userId,
    {
      $pull: {
        [field]: id,
      },

      $inc: {
        [number]: -1,
      },
    },
    {
      new: true,
    }
  );
}

// export async function readAndNestedPopulate(
//   userId: string,
//   path: string,
//   path2: string,
//   model: string
// ) {
//   return await userModel.findOne({ _id: userId }).populate({
//     path: path,
//     populate: {
//       path: path2,
//       model: model,
//     },
//   });
// }

export async function readAndNestedPopulate(
  userId: string,
  path: string,
  path2: string
): Promise<UserDocument | null> {
  return await userModel.findOne({ _id: userId }).populate({
    path: path,
    populate: {
      path: path2,
    },
  });
}

export const findByInAndPopulte = async (
  field: string,
  values: Types.ObjectId[],
  path: string
) => {
  return await userModel.find({ [field]: { $in: values } }).populate({
    path: path,
  });
};

export const followedUsers = async (user: UserDocument, path: string) => {
  const lll = await userModel.find({
    _id: { $in: user.followed },
  });

  console.log(lll);
  return lll;

  // .populate({
  //   path: path,
  // });
};

export async function readAndPopulate(
  userId: string,
  path: string
  // model: string
) {
  const user = userModel.findOne({ _id: userId });
  return user.populate({
    path: path,
    // model: model,
  });
}
