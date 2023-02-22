import { getFileBuffer } from "../../aws/s3";
import userModel from "../../DL/models/user";
import { findByInAndPopulte } from "../../global/readAndPopulateDocument";
import { read, readById, readOne } from "../../global/readDocument";

export const getFollowedPosts = async (userId: string) => {
  const get = await readById(userModel, userId);
  if (!get) {
    return [];
  }
  const followedUsers = await findByInAndPopulte(
    userModel,
    "_id",
    get.followed,
    "posts"
  );
  return followedUsers.flatMap((followedUser) => followedUser.posts);
};

export const getUser = async (email: string) => {
  return await readOne(userModel, "email", email);
};

export const getAllUsers = async () => {
  try {
    const users = await read(userModel);
    console.log("usersss", users);

    const userWithImg = await Promise.all(
      (users || []).map(async (u) => {
        const imgBuffer = await getFileBuffer(u.profileImg);
        const dataUrl = `data:image/*;base64,${imgBuffer.toString("base64")}`;

        console.log("getalllll", { ...u, profileImg: dataUrl });

        return { ...u, profileImg: dataUrl };
      })
    );
    return userWithImg;
  } catch (err: any) {
    console.log(err);
  }
};
