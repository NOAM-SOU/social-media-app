// export const deleteUser = async (userId) => {
//   const deletedUser = await users.del(userId);
// };

import { readById } from "../../global/readDocument";
import userModel from "../../DL/models/user";

export const getUser = async (id: string) => {
  return await readById(userModel, id);
};

// export const getUser = async (email: string) => {
//   return await readOne(userModel, "email", email);
// };
