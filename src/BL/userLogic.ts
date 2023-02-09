// export const deleteUser = async (userId) => {
//   const deletedUser = await users.del(userId);
// };

import { readbyId } from "../DL/controllers/userController";

export const getUser = async (id: string) => {
  return await readbyId(id);
};
