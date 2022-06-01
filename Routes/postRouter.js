const express = require("express");
router = express.Router();

const { PostError } = require("../BL/errors");
const {
  addNewPost,
  deletePost,
  savePost,
  removeSavedPost,
} = require("../BL/postLogic");

router.post("/addnewpost", async (req, res) => {
  try {
    console.log("newPost: request", req.body, "ma", req.user.input._id);
    const data = await addNewPost(req.body, req.user.input._id);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
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

router.post("/deletepost", async (req, res) => {
  try {
    console.log("delete: request", req.body);
    const data = await deletePost(req.user.input._id, req.body.postId);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
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

router.post("/savepost", async (req, res) => {
  try {
    console.log(
      "savepost: request",
      req.user.input._id,
      "posr",
      req.body.postId
    );
    const data = await savePost(req.user.input._id, req.body.postId);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
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

router.post("/removesavedpost", async (req, res) => {
  try {
    console.log("savepost: request", req.body);
    const data = await removeSavedPost(req.user.input._id, req.body.postId);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
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
