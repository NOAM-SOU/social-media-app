import multer from "multer";
const upload = multer({ dest: "uploads/" });
import fs from "fs";
import util from "util";

export const uploadImg = (name: string) => {
  console.log("here");

  return upload.single(name);
};

export const unLinkFile = util.promisify(fs.unlink);
