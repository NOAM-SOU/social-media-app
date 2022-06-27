// @ts-check
const jwt = require("jsonwebtoken");
const users = require("../DL/controllers/userController");

/**
 * @param {object} user
 */

const createUserToken = (user) => {
  const { _id, name, email, profileImg } = user;
  const token = jwt.sign(
    { _id, name, email, profileImg },
    process.env.JWT_SECRET,
    {
      expiresIn: "10h",
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

module.exports = { createUserToken, deleteUser };
