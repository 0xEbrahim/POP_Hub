import { inject, injectable } from "tsyringe";
import { IAuthRespository } from "./Repository/IAuthRepository";
import { IRegisterBody, IUser } from "@Modules/User/Models/User.Models";
import { hashPassword } from "@Shared/utils/Functions/passwordHash";
import { IResponse } from "@Shared/types/types";
import ApiResponse from "@Shared/utils/ApiResponse";

@injectable()
class AuthService {
  constructor(
    @inject("AuthRepository") private readonly AuthRepository: IAuthRespository
  ) {}

  async signUp(data: IRegisterBody): Promise<IResponse> {
    const emailExist = await this.AuthRepository.findByEmail(data.email);
    const usernameExists = await this.AuthRepository.findByUsername(
      data.username
    );
    if (emailExist || usernameExists)
      ApiResponse.AlreadyExist("Email or username already exists.");
    data.password = await hashPassword(data.password);
    const user: IUser = await this.AuthRepository.create(data);
    user.password = undefined;
    return ApiResponse.Created({ user });
  }
}

export default AuthService;
