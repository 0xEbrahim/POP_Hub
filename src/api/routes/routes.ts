import { AuthRouter } from "@Modules/Auth/Auth.Routes";
import { Router } from "express";

const router = Router();

router.use("/auth", AuthRouter);

export default router;
