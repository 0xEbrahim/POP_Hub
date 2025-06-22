import { Router } from "express";
import AuthController from "./Auth.Controller";
import validaitonMiddleware from "@Shared/middlewares/validaitonMiddleware";
import { registerSchema as registerBodySchema } from "./Auth.Validation";

const router = Router();

router.post(
  "/signup",
  validaitonMiddleware({ body: registerBodySchema }),
  AuthController.register
);

export const AuthRouter = router;
