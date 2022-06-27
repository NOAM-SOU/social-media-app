// @ts-check
const posts = require("../DL/controllers/postController");
const users = require("../DL/controllers/userController");
const { PostError } = require("./errors");

/**
 * @param {object} input
 * @param {string} id
 */

const addNewPost = async (input, id) => {
  const newPost = await posts.create({ ...input, userId: id });
  const addPostToUser = await users.update(
    id,
    "posts",
    newPost,
    "numberOfPosts"
  );
  return { newPost, addPostToUser };
};

/**
 * @param {string} id
 * @param {string} postId
 * @return {Promise<object>}
 */

const deletePost = async (id, postId) => {
  const delPostFromUser = await users.updateUser(
    id,
    "posts",
    postId,
    "numberOfPosts"
  );
  await posts.del(postId);
  return delPostFromUser;
};

/**
 * @param {string} userId
 * @param {string} postId
 * @returns {Promise<object>}
 */

const savePost = async (userId, postId) => {
  const userSaved = await users.readOne({
    _id: userId,
  });
  const array = userSaved.savedPosts.map((e) => e.toString());
  if (array.includes(postId)) throw new PostError("Post already saved", 1);
  await users.update(userSaved._id, "savedPosts", postId);
  const postSaved = await posts.addUpdate(
    postId,
    "savedBy",
    userId,
    "numberOfSave"
  );
  return postSaved;
};

const removeSavedPost = async (userId, postId) => {
  const userSaved = await users.updateUser(userId, "savedPosts", postId);
  const postSaved = await posts.removeUpdate(
    postId,
    userId,
    "savedBy",
    "numberOfSave"
  );
  return { userSaved, postSaved };
};

/**
 * @returns {Promise<array>}
 */
const getUserPosts = async (userId) => {
  const get = await users.readAndPopulate(userId, "posts");
  return get.posts;
};

module.exports = {
  addNewPost,
  deletePost,
  savePost,
  removeSavedPost,
  getUserPosts,
};
