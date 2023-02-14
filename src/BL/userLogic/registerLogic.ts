import { readOne } from "../../DL/controllers/userController";
import { AuthError } from "../errors/errors";
import { createToken } from "../../tools/create.token";
import { UserI } from "../../interfaces/user";
import { Token } from "../../types/token";
import { getUser, hashPassword } from "../../tools/auth";
import { create } from "../../global/createDocument";
import userModel from "../../DL/models/user";

export async function register(user: UserI): Promise<Token> {
  const existitngUser = await readOne(user.email);
  if (existitngUser) throw new AuthError("User already exists", 1);
  const hashedPassword = await hashPassword(user.password);
  const newUser = await create(userModel, {
    ...user,
    password: hashedPassword,
  } as UserI);
  const jwt = await createToken(await getUser(newUser));
  return jwt;
}
