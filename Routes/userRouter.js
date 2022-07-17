const express = require("express");
router = express.Router();
const { signUp } = require("../BL/registerLogic");
const { login } = require("../BL/loginLogic");
const { AuthError } = require("../BL/errors");
const { routerFunc } = require("../BL/tools");

router.post("/register", async (req, res) => {
  routerFunc(res, AuthError, signUp, req.body);
});

router.post("/login", async (req, res) => {
  routerFunc(res, AuthError, login, req.body);
});

module.exports = router;
