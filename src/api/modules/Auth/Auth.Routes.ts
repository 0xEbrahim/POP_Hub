import { Router } from "express";
import AuthController from "./Auth.Controller";
import validaitonMiddleware from "@Shared/middlewares/validaitonMiddleware";
import {
  loginBodySchema,
  registerSchema as registerBodySchema,
} from "./Auth.Validation";

const router = Router();

router.post(
  "/signup",
  validaitonMiddleware({ body: registerBodySchema }),
  AuthController.register
);
router.post(
  "/login",
  validaitonMiddleware({ body: loginBodySchema }),
  AuthController.login
);

export const AuthRouter = router;
