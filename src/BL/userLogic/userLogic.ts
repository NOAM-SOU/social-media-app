// export const deleteUser = async (userId) => {
//   const deletedUser = await users.del(userId);
// };

import { readById } from "../../global/readDocument";
import userModel from "../../DL/models/user";
import { getFileBuffer } from "../../aws/s3";
// import { getFileStream } from "../../aws/s3";

export const getUser = async (id: string) => {
  try {
    const user = await readById(userModel, id);
    if (user) {
      const buffer = await getFileBuffer(user.profileImg);
      const dataUrl = `data:image/*;base64,${buffer.toString("base64")}`;
      return { ...user, profileImg: dataUrl };
    }
  } catch (error: any) {
    console.log(error);
  }
};
// export const getUser = async (email: string) => {
//   return await readOne(userModel, "email", email);
// };
