import {
  addUpdate,
  readAndPopulate,
  removeUpdate,
} from "../DL/controllers/postController";
export const addLikeToPost = async (userId: string, postId: string) => {
  const addLikeToPost = await addUpdate(
    postId,
    "likes",
    userId,
    "numberOfLikes"
  );
  return addLikeToPost;
};

export const removeLike = async (userId: string, postId: string) => {
  const removeLikeFromPost = await removeUpdate(
    postId,
    userId,
    "likes",
    "numberOfLikes"
  );
  return removeLikeFromPost;
};

export const getLikes = async (postId: string) => {
  const likes = await readAndPopulate(postId, "likes");
  return likes?.likes;
};
