import { addUpdate } from "../../global/updateDocument";
import userModel from "../../DL/models/user";
import { Update } from "../../interfaces/update";

export const addFollow = async (userId: string, to: string) => {
  const updateS: Update = {
    id: to,
    field: "followers",
    update: userId,
    numberOf: "numberOfFollowers",
    number: 1,
  };
  const newFollow = await addUpdate(userModel, updateS);
  const updateD: Update = {
    id: userId,
    field: "followed",
    update: to,
    numberOf: "numberOfFollowed",
    number: 1,
  };
  const newFollowed = await addUpdate(userModel, updateD);
  return { newFollow, newFollowed };
};
