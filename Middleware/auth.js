const jwt = require("jsonwebtoken");
// require("dotenv").config();

/**
 * @param {string} input
 */

const auth = async (input) => {
  const token = input.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.input);
  return decoded;
};

module.exports = { auth };
