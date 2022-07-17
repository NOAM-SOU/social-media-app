const express = require("express");
router = express.Router();
const { addFollow, getPosts, getUser, getAllUsers } = require("../BL/follow");
const { UserError } = require("../BL/errors");
const { routerFunc } = require("../BL/tools");

router.get("/addfollow/:id/:follow", async (req, res) => {
  routerFunc(res, UserError, addFollow, req.params.id, req.params.follow);
});

router.get("/getposts/:id", async (req, res) => {
  routerFunc(res, UserError, getPosts, req.params.id);
});

router.get("/getuser/:id", async (req, res) => {
  routerFunc(res, UserError, getUser, req.params.id);
});

router.get("/getall", async (req, res) => {
  routerFunc(res, UserError, getAllUsers);
});
module.exports = router;
