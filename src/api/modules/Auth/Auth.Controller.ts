import { IResponse } from "@Shared/types/types";
import asyncHandler from "@Shared/utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import AuthService from "./Auth.Service";
import ApiResponse from "@Shared/utils/ApiResponse";
import env from "@Shared/constants/env";

class AuthController {
  static register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = container.resolve(AuthService);
      const result: IResponse = await authService.signUp(req.body);
      ApiResponse.send(result, res);
    }
  );

  static login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = container.resolve(AuthService);
      const result: IResponse = await authService.login(req.body);
      res.cookie("jwt", result.refreshToken, {
        secure: env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 60 * 24 * 60 * 60 * 1000,
        path: "/",
      });
      ApiResponse.send(result, res);
    }
  );
}

export default AuthController;
