const express = require("express");
router = express.Router();
const { addFollow, getPosts, getUser, getAllUsers } = require("../BL/follow");
const { UserError } = require("../BL/errors");

router.post("/addfollow/:id", async (req, res) => {
  try {
    console.log("addfollow: request", req.body);
    const data = await addFollow(req.params.id, req.body.userId);
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

router.get("/getposts/:id", async (req, res) => {
  try {
    console.log("getposts: request", req.params.id);
    const data = await getPosts(req.params.id);
    console.log("getposts: response", data);
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

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log("getUser: request", req.params.id);
    const data = await getUser(req.params.id);
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

router.get("/getall", async (req, res) => {
  try {
    const data = await getAllUsers();
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
