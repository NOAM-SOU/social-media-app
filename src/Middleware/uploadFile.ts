import multer from "multer";
const upload = multer({ dest: "uploads/" });

export const uploadImg = async () => {
  return await upload.single("image");
};
