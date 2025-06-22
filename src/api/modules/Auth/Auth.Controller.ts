import { IResponse } from "@Shared/types/types";
import asyncHandler from "@Shared/utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import AuthService from "./Auth.Service";
import ApiResponse from "@Shared/utils/ApiResponse";

class AuthController {
  static register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = container.resolve(AuthService);
      const result: IResponse = await authService.signUp(req.body);
      ApiResponse.send(result, res);
    }
  );
}

export default AuthController;
