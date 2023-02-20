// export const deleteUser = async (userId) => {
//   const deletedUser = await users.del(userId);
// };

import { readById } from "../../global/readDocument";
import userModel from "../../DL/models/user";
// import { getFileStream } from "../../aws/s3";

export const getUser = async (id: string) => {
  try {
    const user = await readById(userModel, id);
    return user;
  } catch (error: any) {
    console.log(error);
  }
};
// export const getUser = async (email: string) => {
//   return await readOne(userModel, "email", email);
// };
