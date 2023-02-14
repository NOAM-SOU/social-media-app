import * as bcrypt from "bcrypt";
import { UserDetails, UserI } from "../interfaces/user";
import { UserDocument } from "../DL/models/user";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePass(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export async function getUser(user: UserI): Promise<UserDetails> {
  return await {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}
