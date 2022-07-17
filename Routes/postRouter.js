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
const { routerFunc } = require("../BL/tools");

router.post("/addnewpost/:id", async (req, res) => {
  routerFunc(res, PostError, addNewPost, req.body, req.params.id);
});

router.delete("/deletepost/:userid/:id", async (req, res) => {
  routerFunc(res, PostError, deletePost, req.params.userid, req.params.id);
});

router.get("/savepost/:userid/:postid", async (req, res) => {
  routerFunc(res, PostError, savePost, req.params.userid, req.params.postid);
});

router.get("/removesavedpost/:userid/:postid", async (req, res) => {
  routerFunc(
    res,
    PostError,
    removeSavedPost,
    req.params.userid,
    req.params.postid
  );
});

router.get("/new/:id", async (req, res) => {
  routerFunc(res, PostError, getUserPosts, req.params.id);
});

router.get("/getpost/:id", async (req, res) => {
  routerFunc(res, PostError, getPost, req.params.id);
});

module.exports = router;
