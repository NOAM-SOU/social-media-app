// @ts-check
const posts = require("../DL/controllers/postController");
const comments = require("../DL/controllers/commentController");
const { filterFunc } = require("../BL/tools");

/**
 * @param {string} userId
 * @param {string} postId
 * @param {object} input
 * @return {Promise<object>}
 */

const addNewComment = async (userId, postId, input) => {
  const newComment = await comments.create({
    ...input,
    userId: userId,
    postId: postId,
  });
  const addCommentToPost = await posts.addUpdate(
    postId,
    "comments",
    newComment,
    "numberOfComments"
  );
  return { newComment, addCommentToPost };
};

/**
 * @param {string} postId
 * @return {Promise<object>}
 */

const getComments = async (postId) => {
  const getAll = await posts.readAndNestedPopulate(
    postId,
    "comments",
    "user",
    "userId"
  );
  return filterFunc(getAll.comments);
};

module.exports = { addNewComment, getComments };
