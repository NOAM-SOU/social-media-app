import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("DB Connected");
  } catch (error) {
    console.error("mongoose error", error);
  }
};