import express from "express";
import { PostError } from "../BL/errors/errors";
import { addNewPost } from "../BL/postLogic/addPost";
import { deletePost } from "../BL/postLogic/deletePost";
import { removeSavedPost } from "../BL/postLogic/rmSavedPost";
import { savePost } from "../BL/postLogic/savePost";

const router = express.Router();

router.post("/addnewpost/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await addNewPost(req.body, req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.delete("/deletepost/:userid/:id", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await deletePost(req.params.userid, req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.get("/savepost/:id/:postid", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await savePost(req.params.id, req.params.postid);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
router.get("/removesavedpost/:userid/:postid", async (req, res) => {
  // work
  try {
    console.log("req.body:", req.body);

    const data = await removeSavedPost(req.params.userid, req.params.postid);
    res.send(data);
  } catch (err) {
    if (err instanceof PostError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});
// router.get("/new/:id", async (req, res) => {
//   // work
//   try {
//     console.log("req.body:", req.body);

//     const data = await getUserPosts(req.params.id);
//     res.send(data);
//   } catch (err) {
//     if (err instanceof PostError) {
//       res.status(401).send({
//         error: err.message,
//         code: err.code,
//       });
//     }
//   }
// });
// router.get("/getpost/:id", async (req, res) => {
//   // work
//   try {
//     console.log("req.body:", req.body);

//     const data = await getPost(req.params.id);
//     res.send(data);
//   } catch (err) {
//     if (err instanceof PostError) {
//       res.status(401).send({
//         error: err.message,
//         code: err.code,
//       });
//     }
//   }
// });

export default router;
