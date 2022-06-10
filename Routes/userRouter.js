const express = require("express");
router = express.Router();
const { signUp } = require("../BL/registerLogic");
const { login } = require("../BL/loginLogic");
const { getUser } = require("../BL/userLogic");
const { AuthError } = require("../BL/errors");

router.post("/register", async (req, res) => {
  try {
    console.log("register: request", req.body);
    const data = await signUp(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
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

router.post("/login", async (req, res) => {
  try {
    console.log("login: request", req.body);
    const data = await login(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
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
