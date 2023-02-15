import { addUpdate } from "../../global/updateDocument";
import userModel from "../../DL/models/user";
import { Update } from "../../interfaces/update";

export const removeFollow = async (userId: string, from: string) => {
  const updateS: Update = {
    id: from,
    field: "followers",
    update: userId,
    numberOf: "numberOfFollowers",
    number: -1,
  };
  const removeFromFollowedUser = await addUpdate(userModel, updateS, false);
  const updateD: Update = {
    id: userId,
    field: "followed",
    update: from,
    numberOf: "numberOfFollowed",
    number: -1,
  };
  const removeFromUser = await addUpdate(userModel, updateD, false);

  return { removeFromUser, removeFromFollowedUser };
};
