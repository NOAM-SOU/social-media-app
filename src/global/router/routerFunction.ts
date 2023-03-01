import express from "express";
import { IRouterMatcher, RequestHandler } from "express";
import { AuthError, PostError } from "../../BL/errors/errors";

const router = express.Router();

type ErrorC = AuthError | PostError;

export function getRouter<T>(
  path: string,
  func: Function,
  argToFunc?: any,
  ErrorC?: any
) {
  router.get(path, async (req, res) => {
    // work
    try {
      // console.log("req.body:", req.body);

      const data = await func(argToFunc);
      res.send(data);
    } catch (err: any) {
      if (err instanceof ErrorC) {
        res.status(401).send({
          error: err.message,
          code: err.code,
        });
      }
    }
  });
}

// export function routerF<T>(method: IRouterMatcher<T>,path:string,req:Request,res:Response,func:Function,ErrorC:Error) {
// router.method("/register", async (req, res) => {
//     // work
//     try {
//       console.log("req.body:", req.body);

//       const data = await func(req.body);
//       res.send(data);
//     } catch (err) {
//       if (err instanceof ErrorC) {
//         res.status(401).send({
//           error: err.message,
//           code: err.code,
//         });
//       }
//     }
//   });
// }
