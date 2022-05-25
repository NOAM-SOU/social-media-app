const users = require("../DL/controllers/userController");
const { userError } = require("../BL/errors");
const bcrypt = require("bcrypt");
// require("../DL//db").connect();

/**
 * @param {object} input
 */

const signUp = async (input) => {
  const exist = await users.readOne({ email: input.email });
  if (exist) {
    throw new userError("User already exist", 1);
  }
  const hash = await bcrypt.hash(input.password, 10);
  const user = await users.create({ ...input, password: hash });
  console.log(user);
  return user;
};

module.exports = { signUp };
