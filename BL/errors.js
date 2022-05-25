class userError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class postError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = { userError, postError };
