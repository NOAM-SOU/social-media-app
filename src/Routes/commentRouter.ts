import express from "express";
import { addNewComment, getComments } from "../BL/commentLogic";

const router = express.Router();

router.post("/addcomments/:userid/:postid", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await addNewComment(
      req.params.userid,
      req.params.postid,
      req.body
    );
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.get("/getcomments/:id", async (req, res) => {
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

export default router;
