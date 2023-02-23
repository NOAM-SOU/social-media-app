import userModel from "../../DL/models/user";
import { findByIn, readById } from "../../global/readDocument";

export const getFollowedUsers = async (userId: string) => {
  const user = await readById(userModel, userId);
  if (user) return await findByIn(userModel, "_id", user.followed);
};
