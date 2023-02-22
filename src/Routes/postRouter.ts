import express from "express";
import { getFileBuffer, uploadFile } from "../aws/s3";
import { PostError } from "../BL/errors/errors";
import { addNewPost } from "../BL/postLogic/addPost";
import { deletePost } from "../BL/postLogic/deletePost";
import { getPost } from "../BL/postLogic/postLogic";
import { removeSavedPost } from "../BL/postLogic/rmSavedPost";
import { savePost } from "../BL/postLogic/savePost";
import { unLinkFile, uploadImg } from "../Middleware/uploadFile";
import { getUserPosts } from "../BL/postLogic/postLogic";

const router = express.Router();

router.post("/addnewpost/:id", uploadImg("img"), async (req, res) => {
  console.log("reqqqqq", req);

  // work
  try {
    console.log("req.body:", req.body);
    console.log("file", req.file);
    const file = req.file!;
    const upload = await uploadFile(file);
    console.log("upload", upload);
    await unLinkFile(file.path);

    const data = await addNewPost(
      { ...req.body, img: file?.filename },
      req.params.id
    );
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.delete("/deletepost/:userid/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await deletePost(req.params.userid, req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.get("/savepost/:id/:postid", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await savePost(req.params.id, req.params.postid);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
router.get("/removesavedpost/:userid/:postid", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await removeSavedPost(req.params.userid, req.params.postid);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
router.get("/new/:id", async (req, res) => {
  console.log("req.body:", req.body);
  // work
  try {
    const data = await getUserPosts(req.params.id);

    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
router.get("/getpost/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await getPost(req.params.id);

    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

export default router;
