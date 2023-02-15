import { UserI } from "../../interfaces/user";
import userModel, { UserDocument } from "../models/user";
// import { create, read, readOne as one } from "../../global/createDocument";

// export const createUser = async (user: UserI) => create(userModel, user);

// export const readUsers = async () => read(userModel);

// export const readUser = async (id: string) => one(userModel, id);

// export const read = async (): Promise<UserI[]> => {
//   return await userModel.find();
// };

export const readOne = async (email: string): Promise<UserDocument | null> => {
  return await userModel.findOne({ email });
};

export async function readbyId(id: string): Promise<UserDocument | null> {
  return await userModel.findById({ _id: id });
}

export async function del(id: string): Promise<UserDocument | null> {
  return await userModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
}
