// import { readOne } from "../../DL/controllers/userController";
import { AuthError } from "../errors/errors";
import { createToken } from "../../tools/create.token";
import { ExistingUser } from "../../interfaces/user";
import { Token } from "../../types/token";
import { comparePass, getUser } from "../../tools/auth";
import { readOne } from "../../global/readDocument";
import userModel from "../../DL/models/user";

export async function login(user: ExistingUser) {
  const userExisting = await readOne(userModel, "email", user.email);
  if (!userExisting) throw new AuthError("User not found", 2);
  const passMatch = await comparePass(user.password, userExisting.password);
  if (!passMatch) throw new AuthError("Wrong password", 3);
  const jwt = await createToken(await getUser(userExisting));
  return jwt;
}
