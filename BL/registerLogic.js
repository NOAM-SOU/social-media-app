// @ts-check
const users = require("../DL/controllers/userController");
const { AuthError } = require("../BL/errors");
const bcrypt = require("bcrypt");
// require("../DL//db").connect();

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
  return user;
};

const user = {
  name: "majida",
  email: "majida@gmail.com",
  password: "098765",
  biography: "I am A singer",
  profileImg:
    "https://www.telemundo.com/sites/nbcutelemundo/files/images/article/cover/2020/01/23/poster-de-operacion-pacifico.jpg",
};

// signUp(user);

module.exports = { signUp };
