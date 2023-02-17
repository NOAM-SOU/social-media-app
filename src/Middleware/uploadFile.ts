import multer from "multer";
const upload = multer({ dest: "uploads/" });

export const uploadImg = () => {
  console.log("here");

  return upload.single("profileImg");
};
