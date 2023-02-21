import userModel from "../../DL/models/user";
import postModel from "../../DL/models/post";
import {
  populeted,
  readOneAndPopulate,
} from "../../global/readAndPopulateDocument";
import { readOne } from "../../global/readDocument";
import { PostI } from "../../interfaces/post";
import { getFileBuffer } from "../../aws/s3";

export const getUserPosts = async (userId: string): Promise<any> => {
  try {
    const posts = await populeted(postModel, userId, "userId");
    console.log("posts", posts);

    const postWithImg = await Promise.all(
      (posts || []).map(async (p) => {
        const imgBuffer = await getFileBuffer(p.img);
        const dataUrl = `data:image/*;base64,${imgBuffer.toString("base64")}`;

        console.log({ ...p, img: dataUrl });

        return { ...p, img: dataUrl };
      })
    );
    return postWithImg;
  } catch (err: any) {
    console.log(err);
  }
};

export const getPost = async (id: string) => {
  return await readOne(postModel, "_id", id);
};
