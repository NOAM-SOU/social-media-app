import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { UserDetails } from "../interfaces/user";
import { Token } from "../types/token";

export async function createToken(user: UserDetails): Promise<Token> {
  const { id, name, email } = user;
  const token = jwt.sign({ id, name, email }, `${process.env.JWT_SECRET}`, {
    expiresIn: "10h",
  });
  return { token: token };
}
