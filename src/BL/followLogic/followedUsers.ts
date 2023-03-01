import userModel from "../../DL/models/user";
import { findByIn, readById } from "../../global/readDocument";

export const getFollowedUsers = async (userId: string) => {
  try {
    const user = await readById(userModel, userId);
    if (user) return await findByIn(userModel, "_id", user.followed);
  } catch (err) {
    console.log("aca esta el problema");
  }
};
