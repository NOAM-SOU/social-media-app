import express from "express";
import { addFollow, getAllUsers, getPosts } from "../BL/follow";
import { getUser } from "../BL/userLogic";

const router = express.Router();

router.get("/addfollow/:id/:follow", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await addFollow(req.params.id, req.params.follow);
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});
router.get("/getposts/:id", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await getPosts(req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.post("/getuser/:id", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await getUser(req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

router.post("/getall", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const data = await getAllUsers();
    res.send(data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send({
        error: err.message,
      });
    }
  }
});

export default router;
