class UserError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class PostError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class AuthError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = { UserError, PostError, AuthError };
