// @ts-check
const jwt = require("jsonwebtoken");
const users = require("../DL/controllers/userController");
// require("../DL//db").connect();

/**
 * @param {object} input
 */

const createUserToken = (input) => {
  const token = jwt.sign(
    {
      input,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { auth_token: token };
};

/**
 * @param {string} userId
 */

const deleteUser = async (userId) => {
  const deletedUser = await users.del(userId);
};

const getAllUsers = async () => {
  const allUsers = await users.read();
  return allUsers;
};

module.exports = { createUserToken, deleteUser, getAllUsers };
