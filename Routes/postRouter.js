const express = require("express");
router = express.Router();

const { PostError } = require("../BL/errors");
const {
  addNewPost,
  deletePost,
  savePost,
  removeSavedPost,
  getUserPosts,
  getPost,
} = require("../BL/postLogic");

router.post("/addnewpost/:id", async (req, res) => {
  try {
    console.log("newPost: request", req.body, "ma", req.params.id);
    const data = await addNewPost(req.body, req.params.id);
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

router.delete("/deletepost/:userid/:id", async (req, res) => {
  try {
    console.log(
      "userId: request",
      req.params.userid,
      "postId: request",
      req.params.id
    );
    const data = await deletePost(req.params.userid, req.params.id);
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
    console.log("savepost: request", req.user._id, "posr", req.body.postId);
    const data = await savePost(req.user._id, req.body.postId);
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
    const data = await removeSavedPost(req.user._id, req.body.postId);
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

router.get("/new/:id", async (req, res) => {
  try {
    console.log("get: request", req.params.id);
    const data = await getUserPosts(req.params.id);
    console.log("get: response", data);
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

router.get("/getpost/:id", async (req, res) => {
  try {
    console.log("get: request", req.params.id);
    const data = await getPost(req.params.id);
    console.log("get: response", data);
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
