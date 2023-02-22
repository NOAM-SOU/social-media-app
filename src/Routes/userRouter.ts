import express from "express";
import { getFileBuffer, uploadFile } from "../aws/s3";
import { AuthError } from "../BL/errors/errors";
import { getAllUsers } from "../BL/followLogic/follow";
import { login } from "../BL/userLogic/loginLogic";
import { register } from "../BL/userLogic/registerLogic";
const router = express.Router();
import { getUser } from "../BL/userLogic/userLogic";
import { unLinkFile, uploadImg } from "../Middleware/uploadFile";

router.post("/register", uploadImg("profileImg"), async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);
    console.log("file", req.file);
    const file = req.file!;
    const upload = await uploadFile(file);
    console.log("upload", upload);
    await unLinkFile(file.path);

    const data = await register({ ...req.body, profileImg: file.filename });
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
router.post("/login", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await login(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
      console.log(err);

      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    const data = await getUser(req.params.id);
    res.send(data);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.get("/getall", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await getAllUsers();
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

export default router;
