// @ts-check
const posts = require("../DL/controllers/postController");

/**
 * @param {string} userId
 * @param {string} postId
 * @return {Promise<object>}
 */

const addLikeToPost = async (userId, postId) => {
  const addLikeToPost = await posts.addUpdate(
    postId,
    "likes",
    userId,
    "numberOfLikes"
  );
  return addLikeToPost;
};

/**
 * @param {string} userId
 * @param {string} postId
 * @return {Promise<object>}
 */

const removeLike = async (userId, postId) => {
  const removeLikeFromPost = await posts.removeUpdate(
    postId,
    userId,
    "likes",
    "numberOfLikes"
  );
  return removeLikeFromPost;
};

/**
 * @param {string} postId
 * @return {Promise<object>}
 */

const getLikes = async (postId) => {
  const likes = await posts.readAndPopulate(postId, "likes");
  return likes.likes;
};

module.exports = { addLikeToPost, removeLike, getLikes };
