import multer from "multer";
const upload = multer({ dest: "uploads/" });

export const uploadImg = (name: string) => {
  console.log("here");

  return upload.single(name);
};
