// @ts-check
const users = require("../DL/controllers/userController");
const { AuthError } = require("../BL/errors");
const bcrypt = require("bcrypt");
const { createUserToken } = require("./userLogic");

/**
 * @param {object} input
 */

const signUp = async (input) => {
  const exist = await users.readOne({ email: input.email });
  if (exist) {
    throw new AuthError("User already exist", 1);
  }
  const hash = await bcrypt.hash(input.password, 10);
  const user = await users.create({ ...input, password: hash });
  return createUserToken(user);
};

module.exports = { signUp };
