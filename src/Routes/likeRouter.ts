import express from "express";
import { addLikeToPost, getLikes, removeLike } from "../BL/likeLogic/likeLogic";

const router = express.Router();

router.get("/addlike/:userid/:postid", async (req, res) => {
  // work
  try {
    console.log("req.body-addlikeee:", req.params.userid, req.params.postid);

    const data = await addLikeToPost(req.params.userid, req.params.postid);
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});
router.get("/removelike/:userid/:postid", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await removeLike(req.params.userid, req.params.postid);
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.get("/getlikes/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await getLikes(req.params.id);
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
