const express = require("express");
router = express.Router();
const { addNewComment, getComments } = require("../BL/commentLogic");
const { UserError } = require("../BL/errors");
const { routerFunc } = require("../BL/tools");

router.post("/addcomments/:userid/:postid", async (req, res) => {
  routerFunc(
    res,
    UserError,
    addNewComment,
    req.params.userid,
    req.params.postid,
    req.body
  );
});

router.get("/getcomments/:id", async (req, res) => {
  routerFunc(res, UserError, getComments, req.params.id);
});

module.exports = router;
