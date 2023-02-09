import express from "express";
import { AuthError } from "../BL/errors";
import { login } from "../BL/loginLogic";
const router = express.Router();
import { register } from "../BL/registerLogic";

router.post("/register", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await register(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
router.post("/login", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await login(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

export default router;
