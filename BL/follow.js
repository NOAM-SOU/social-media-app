// @ts-check
const users = require("../DL/controllers/userController");

/**
 * @param {string} userId
 * @param {string} to
 */
const addFollow = async (userId, to) => {
  const newFollow = await users.update(
    to,
    "followers",
    userId,
    "numberOfFollowers"
  );
  const newFollowed = await users.update(
    userId,
    "followed",
    to,
    "numberOfFollowed"
  );
  return { newFollow, newFollowed };
};

/**
 * @param {string} userId
 */
const getPosts = async (userId) => {
  const get = await users.readAndNestedPopulate(
    userId,
    "followed",
    "post",
    "posts"
  );
  const arrays = await get.followed.map((p) => {
    return p.posts;
  });
  return arrays.flat();
};

const getUser = async (userId) => {
  const res = await users.readOne({ _id: userId });
  console.log(res);
  return res;
};

module.exports = { addFollow, getPosts, getUser };
