import { getFileBuffer } from "../../aws/s3";
import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";
import { findByInAndPopulte } from "../../global/readAndPopulateDocument";
import { findByIn, read, readById, readOne } from "../../global/readDocument";
import { Types } from "mongoose";

export const getFollowedPosts = async (userId: string) => {
  const get = await readById(userModel, userId);
  if (!get) {
    return [];
  }
  const followedPosts = await findByIn(postModel, "userId", get.followed);
  // const posts = followedUsers.flatMap((followedUser) => followedUser.posts);

  const postWithImg = await Promise.all(
    (followedPosts || []).map(async (p) => {
      const imgBuffer = await getFileBuffer(p.img);
      const dataUrl = `data:image/*;base64,${imgBuffer.toString("base64")}`;

      // console.log({ ...p, img: dataUrl });

      return { ...p, img: dataUrl };
    })
  );

  // console.log(postWithImg, "POST WITH IMG");

  return postWithImg;
};

export const getUser = async (email: string) => {
  return await readOne(userModel, "email", email);
};

export const getAllUsers = async () => {
  try {
    const users = await read(userModel);
    // console.log("usersss", users);

    const userWithImg = await Promise.all(
      (users || []).map(async (u) => {
        const imgBuffer = await getFileBuffer(u.profileImg);
        const dataUrl = `data:image/*;base64,${imgBuffer.toString("base64")}`;

        // console.log("getalllll", { ...u, profileImg: dataUrl });

        return { ...u, profileImg: dataUrl };
      })
    );
    return userWithImg;
  } catch (err: any) {
    // console.log(err);
  }
};

export const followStatus = async (
  userId: string,
  other: string
): Promise<boolean> => {
  const user = await readById(userModel, userId);
  const array = user.followed.map((e: Types.ObjectId) => e.toString());
  const inc = array.includes(other);
  console.log(inc, "INCLUEDS");
  return inc;
};
