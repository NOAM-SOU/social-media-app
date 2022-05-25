const posts = require("../DL/controllers/postController");
const users = require("../DL/controllers/userController");
const likes = require("../DL/controllers/likeController");
require("../DL/db").connect();

/**
 * @param {object} input
 * @param {string} id
 */

const addNewPost = async (input, id) => {
  const newPost = await posts.create({ ...input, userId: id });
  const addPostToUser = await users.update(id, "posts", newPost);
  return newPost, addPostToUser;
};

/**
 *
 * @param {string} id
 * @param {string} postId
 * @return {Promise<object>}
 */

const addLikeToPost = async (id, postId) => {
  const newLike = await likes.create({ userId: id, postId });
  const addLikeToPost = await posts.update(
    postId,
    "likes",
    newLike,
    "numberOfLikes"
  );
  return addLikeToPost;
};

/**
 *
 * @param {string} id
 * @return {Promise<object>}
 */

const deletePost = async (id) => {
  const postDeleted = await posts.del(id);
  console.log(postDeleted);
  return postDeleted;
};

/**
 *
 * @param {string} postId
 * @param {string} userId
 * @returns {Promise<object>}
 */

const savePost = async (postId, userId) => {
  const pushToUser = await users.update(userId, "savedPosts", postId);
  const postSaved = await posts.update(
    postId,
    "savedBy",
    userId,
    "numberOfSave"
  );
  return postSaved, pushToUser;
};

module.exports = { addNewPost, addLikeToPost, deletePost, savePost };
