// @ts-check
const bcrypt = require("bcrypt");
const users = require("../DL/controllers/userController");
const { AuthError } = require("../BL/errors");
const { createUserToken } = require("../BL/userLogic");

/**
 * @param {object} input
 */

const login = async (input) => {
  let user = await users.readOne({ email: input.email }, { password: 1 });
  if (!user) throw new AuthError("User not found", 2);
  const match = await bcrypt.compare(input.password, user.password);
  if (!match) throw new AuthError("Wrong password", 3);
  user = await users.readOne({ email: input.email });
  return createUserToken(user);
};

module.exports = { login };
