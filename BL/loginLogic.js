const bcrypt = require("bcrypt");
const users = require("../DL/controllers/userController");
const { userError } = require("../BL/errors");
// require("../DL//db").connect();
const { createUserToken } = require("../BL/userLogic");

/**
 * @param {object} input
 */

const login = async (input) => {
  const user = await users.readOne({ email: input.email });
  if (!user) {
    throw new userError("User not found", 2);
  }
  const match = await bcrypt.compare(input.password, user.password);
  if (!match) throw userError("Wrong password", 3);
  console.log(createUserToken(user));
  return createUserToken(user);
};

module.exports = { login };
