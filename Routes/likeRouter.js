const express = require("express");
router = express.Router();
const { addLikeToPost, removeLike, getLikes } = require("../BL/likeLogic");
const { UserError } = require("../BL/errors");

router.post("/addlike", async (req, res) => {
  try {
    console.log("addLike: request", req.body);
    const data = await addLikeToPost(req.user._id, req.body.postId);
    res.send(data);
  } catch (err) {
    if (err instanceof UserError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      res.status(500).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.post("/removelike", async (req, res) => {
  try {
    console.log("removeLike: request", req.body);
    const data = await removeLike(req.user._id, req.body.postId);
    res.send(data);
  } catch (err) {
    if (err instanceof UserError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      res.status(500).send({
        error: err.message,
      });
    }
  }
});

router.get("/getlikes/:id", async (req, res) => {
  try {
    console.log("getlikes: request", req.body);
    const data = await getLikes(req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof UserError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      res.status(500).send({
        error: err.message,
      });
    }
  }
});

module.exports = router;
