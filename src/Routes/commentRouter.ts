import express from "express";
import {
  addNewComment,
  deleteComment,
  getComments,
} from "../BL/commentLogic/commentLogic";

const router = express.Router();

router.post("/addcomments/:userid/:postid", async (req, res) => {
  // work
  try {
    console.log("req", req.params.userid, req.params.postid, req.body);

    const data = await addNewComment(
      req.params.userid,
      req.params.postid,
      req.body
    );
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log("erororrr");

      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.get("/getcomments/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await getComments(req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.get("/deletecomment/:postid/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await deleteComment(req.params.postid, req.params.id);
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
