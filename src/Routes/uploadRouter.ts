import express from "express";
import { uploadImg } from "../Middleware/uploadFile";

const router = express.Router();
router.post("/images", async (req, res) => {
  const file = req.file;
  // console.log(file);
  res.send("siii");
});

export default router;
