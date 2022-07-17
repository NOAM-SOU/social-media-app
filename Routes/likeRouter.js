const express = require("express");
router = express.Router();
const { addLikeToPost, removeLike, getLikes } = require("../BL/likeLogic");
const { UserError } = require("../BL/errors");
const { routerFunc } = require("../BL/tools");

router.get("/addlike/:userid/:postid", async (req, res) => {
  routerFunc(
    res,
    UserError,
    addLikeToPost,
    req.params.userid,
    req.params.postid
  );
});

router.get("/removelike/:userid/:postid", async (req, res) => {
  routerFunc(res, UserError, removeLike, req.params.userid, req.params.postid);
});

router.get("/getlikes/:id", async (req, res) => {
  routerFunc(res, UserError, getLikes, req.params.id);
});

module.exports = router;
