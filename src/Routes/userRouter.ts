import express from "express";
import { getFileStream, uploadFile } from "../aws/s3";
import { AuthError } from "../BL/errors/errors";
import { login } from "../BL/userLogic/loginLogic";
import { register } from "../BL/userLogic/registerLogic";
const router = express.Router();
import { getUser } from "../BL/userLogic/userLogic";
import { uploadImg } from "../Middleware/uploadFile";

router.post("/register", uploadImg(), async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);
    console.log("file", req.file);
    const file = req.file!;
    const upload = await uploadFile(file);
    console.log("upload", upload);

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
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.get("/getuser/:id", async (req, res) => {
  // work
  console.log("parammm", req.params.id);

  try {
    console.log("req.body:", req.body);

    const data = await getUser(req.params.id);
    res.send(data);

    if (data) {
      const readStream = getFileStream(data?.profileImg);
      readStream.pipe(res);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

// router.get("/getall", async (req, res) => {
//   // work
//   try {
//     console.log("req.body:", req.body);

//     const data = await getAllUsers();
//     res.send(data);
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(401).send({
//         error: err.message,
//       });
//     }
//   }
// });

export default router;
