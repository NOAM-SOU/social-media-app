import { create, readOne } from "../DL/controllers/userController";
import { AuthError } from "../BL/errors";
import { createToken } from "../tools/create.token";
import { UserI } from "../interfaces/user";
import { Token } from "../types/token";
import { getUser, hashPassword } from "../tools/auth";

export async function register(user: UserI): Promise<Token> {
  const existitngUser = await readOne(user.email);
  if (existitngUser) throw new AuthError("User already exists", 1);
  const hashedPassword = await hashPassword(user.password);
  const newUser = await create({ ...user, password: hashedPassword });
  const jwt = await createToken(await getUser(newUser));
  return jwt;
}
