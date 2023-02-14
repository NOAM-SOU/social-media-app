import express from "express";
import { AuthError } from "../BL/errors/errors";
import { login } from "../BL/userLogic/loginLogic";
import { register } from "../BL/userLogic/registerLogic";
const router = express.Router();
import { getUser } from "../BL/userLogic/userLogic";

router.post("/register", async (req, res) => {
  // work
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
  // work
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

router.get("/getuser/:id", async (req, res) => {
  // work
  console.log("parammm", req.params.id);

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

// router.get("/getall", async (req, res) => {
//   // work
//   try {
//     console.log("req.body:", req.body);

//     const data = await getAllUsers();
//     res.send(data);
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(401).send({
//         error: err.message,
//       });
//     }
//   }
// });

export default router;
