// class UserError extends Error {
//   constructor(message, code) {
//     super(message);
//     this.code = code;
//   }
// }

export class PostError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class AuthError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
