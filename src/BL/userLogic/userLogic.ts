// export const deleteUser = async (userId) => {
//   const deletedUser = await users.del(userId);
// };

import { readbyId } from "../../DL/controllers/userController";
import { readOne } from "../../global/readDocument";
import userModel from "../../DL/models/user";

// export const getUser = async (id: string) => {
//   return await readbyId(id);
// };

export const getUser = async (email: string) => {
  return await readOne(userModel, "email", email);
};
