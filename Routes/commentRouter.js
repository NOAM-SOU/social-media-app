const express = require("express");
router = express.Router();
const { addNewComment, getComments } = require("../BL/commentLogic");
const { UserError } = require("../BL/errors");

router.post("/addcomments", async (req, res) => {
  try {
    console.log("addcomment: request", req.body);
    const data = await addNewComment(req.user._id, req.body.postId, req.body);
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

router.get("/getcomments/:id", async (req, res) => {
  try {
    console.log("getcomments: request", req.body);
    const data = await getComments(req.params.id);
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
