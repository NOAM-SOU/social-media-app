const express = require("express");
router = express.Router();
const { addFollow, getPosts } = require("../BL/follow");
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

router.get("/getposts", async (req, res) => {
  try {
    console.log("getposts: request", req.body);
    const data = await getPosts(req.body.userId);
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
